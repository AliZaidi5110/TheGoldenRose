const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID (handle both userId and id fields)
    const userId = decoded.userId || decoded.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Account is deactivated.'
      });
    }

    // Add user to request object
    req.user = user;
    
    // Log successful authentication
    logger.logAuth(
      'token_verified',
      user._id,
      user.email,
      req.ip,
      req.get('User-Agent'),
      true
    );

    next();
  } catch (error) {
    logger.logAuth(
      'token_verification_failed',
      null,
      null,
      req.ip,
      req.get('User-Agent'),
      false,
      error
    );

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token expired.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (req.user.role !== 'admin') {
      logger.logAuth(
        'admin_access_denied',
        req.user._id,
        req.user.email,
        req.ip,
        req.get('User-Agent'),
        false
      );

      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    logger.logAuth(
      'admin_access_granted',
      req.user._id,
      req.user.email,
      req.ip,
      req.get('User-Agent'),
      true
    );

    next();
  } catch (error) {
    logger.error(`Admin middleware error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during authorization.'
    });
  }
};

// Middleware to check if user owns the resource or is admin
const ownerOrAdminMiddleware = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Authentication required.'
        });
      }

      // Admin can access any resource
      if (req.user.role === 'admin') {
        return next();
      }

      // Check if user owns the resource
      const resourceUserId = req.body[resourceUserIdField] || 
                           req.params[resourceUserIdField] || 
                           req.query[resourceUserIdField];

      if (!resourceUserId) {
        return res.status(400).json({
          success: false,
          message: 'Resource user ID not provided.'
        });
      }

      if (req.user._id.toString() !== resourceUserId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.'
        });
      }

      next();
    } catch (error) {
      logger.error(`Owner/Admin middleware error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: 'Server error during authorization.'
      });
    }
  };
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return next();
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    
    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Don't fail, just continue without user
    next();
  }
};

// Middleware to generate JWT token
const generateToken = (userId, userRole = 'customer') => {
  return jwt.sign(
    { 
      userId, 
      userRole,
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRE || '7d',
      issuer: 'the-golden-rose',
      audience: 'the-golden-rose-users'
    }
  );
};

// Middleware to verify refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Middleware to generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: '30d',
      issuer: 'the-golden-rose',
      audience: 'the-golden-rose-refresh'
    }
  );
};

// Middleware to check if user is verified
const verifiedUserMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (!req.user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Please verify your email address first.',
        requiresVerification: true
      });
    }

    next();
  } catch (error) {
    logger.error(`Verified user middleware error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during verification check.'
    });
  }
};

module.exports = {
  protect: authMiddleware,
  authorize: (role) => (req, res, next) => {
    if (role === 'admin') {
      return adminMiddleware(req, res, next);
    }
    next();
  },
  authMiddleware,
  adminMiddleware,
  ownerOrAdminMiddleware,
  optionalAuthMiddleware,
  verifiedUserMiddleware,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
};