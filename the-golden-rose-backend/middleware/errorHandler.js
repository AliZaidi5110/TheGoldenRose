const logger = require('../utils/logger');

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(val => val.message);
  const message = `Validation Error: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle Mongoose duplicate key errors
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
  return new AppError(message, 400);
};

// Handle Mongoose cast errors
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handle JWT errors
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again.', 401);
};

// Handle JWT expired errors
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again.', 401);
};

// Handle Stripe errors
const handleStripeError = (err) => {
  let message = 'Payment processing error';
  let statusCode = 400;

  switch (err.type) {
    case 'StripeCardError':
      message = err.message || 'Your card was declined';
      statusCode = 402;
      break;
    case 'StripeRateLimitError':
      message = 'Too many requests made to the API too quickly';
      statusCode = 429;
      break;
    case 'StripeInvalidRequestError':
      message = 'Invalid parameters were supplied to Stripe API';
      statusCode = 400;
      break;
    case 'StripeAPIError':
      message = 'An error occurred with Stripe API';
      statusCode = 500;
      break;
    case 'StripeConnectionError':
      message = 'Network communication with Stripe failed';
      statusCode = 500;
      break;
    case 'StripeAuthenticationError':
      message = 'Authentication with Stripe API failed';
      statusCode = 500;
      break;
    default:
      message = err.message || 'Payment processing error';
  }

  return new AppError(message, statusCode);
};

// Handle PayPal errors
const handlePayPalError = (err) => {
  let message = 'PayPal processing error';
  let statusCode = 400;

  if (err.response && err.response.details) {
    message = err.response.details.map(detail => detail.description).join('. ');
  } else if (err.message) {
    message = err.message;
  }

  return new AppError(message, statusCode);
};

// Handle Cloudinary errors
const handleCloudinaryError = (err) => {
  let message = 'Image upload error';
  
  if (err.message.includes('File size too large')) {
    message = 'Image file size is too large. Maximum size is 5MB.';
  } else if (err.message.includes('Invalid image file')) {
    message = 'Invalid image file format. Please upload JPG, PNG, or WebP files.';
  } else if (err.message) {
    message = err.message;
  }

  return new AppError(message, 400);
};

// Send error response in development
const sendErrorDev = (err, req, res) => {
  // Log error details
  logger.logError(err, req);

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
    request: {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    }
  });
};

// Send error response in production
const sendErrorProd = (err, req, res) => {
  // Log error details
  logger.logError(err, req);

  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.statusCode
    });
  } else {
    // Programming or other unknown error: don't leak error details
    logger.error('UNKNOWN ERROR:', err);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      errorCode: 500
    });
  }
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(`Error: ${err.message}`);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = handleCastError(error);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = handleValidationError(error);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = handleDuplicateKeyError(error);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }

  // Stripe errors
  if (err.type && err.type.startsWith('Stripe')) {
    error = handleStripeError(err);
  }

  // PayPal errors
  if (err.name === 'PayPalError' || (err.response && err.response.name)) {
    error = handlePayPalError(err);
  }

  // Cloudinary errors
  if (err.name === 'CloudinaryError' || err.message.includes('cloudinary')) {
    error = handleCloudinaryError(err);
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File size too large. Maximum size is 5MB.', 400);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new AppError('Too many files uploaded.', 400);
  }

  // Set default status code if not set
  error.statusCode = error.statusCode || 500;

  // Send error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Not found middleware
const notFound = (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};

module.exports = {
  AppError,
  errorHandler,
  asyncHandler,
  notFound,
};