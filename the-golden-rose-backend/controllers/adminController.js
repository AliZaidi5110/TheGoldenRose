const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const AdminLog = require('../models/AdminLog');
const { adminLogger } = require('../utils/logger');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    // Get basic counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Get revenue statistics
    const revenueStats = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          averageOrderValue: { $avg: '$totalPrice' }
        }
      }
    ]);

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent orders
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(5);

    // Get top selling products
    const topProducts = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          totalSold: { $sum: '$orderItems.quantity' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    // Get monthly revenue (last 12 months)
    const monthlyRevenue = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalCategories,
          totalRevenue: revenueStats[0]?.totalRevenue || 0,
          averageOrderValue: revenueStats[0]?.averageOrderValue || 0
        },
        ordersByStatus,
        recentOrders,
        topProducts,
        monthlyRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const users = await User.find({})
      .select('-password')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's order history
    const orders = await Order.find({ user: req.params.id })
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        user,
        orders
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log admin action
    await AdminLog.create({
      admin: req.user._id,
      action: 'update_user',
      targetModel: 'User',
      targetId: user._id,
      details: `Updated user: ${user.email}`,
      changes: req.body
    });

    adminLogger.info(`User updated: ${user.email} by admin: ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow deleting other admins
    if (user.role === 'admin' && req.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete other admin users'
      });
    }

    await user.deleteOne();

    // Log admin action
    await AdminLog.create({
      admin: req.user._id,
      action: 'delete_user',
      targetModel: 'User',
      targetId: user._id,
      details: `Deleted user: ${user.email}`
    });

    adminLogger.info(`User deleted: ${user.email} by admin: ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin logs
// @route   GET /api/admin/logs
// @access  Private/Admin
const getAdminLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const startIndex = (page - 1) * limit;

    const logs = await AdminLog.find({})
      .populate('admin', 'name email')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    const total = await AdminLog.countDocuments();

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system health
// @route   GET /api/admin/health
// @access  Private/Admin
const getSystemHealth = async (req, res, next) => {
  try {
    const dbStatus = 'connected'; // You can add actual DB health check
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    // Get recent error logs (you'd implement this based on your logging system)
    const recentErrors = []; // Placeholder

    // Check for low stock products
    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
      isActive: true
    }).select('name stock');

    // Get pending orders count
    const pendingOrders = await Order.countDocuments({
      orderStatus: 'pending'
    });

    res.status(200).json({
      success: true,
      data: {
        database: dbStatus,
        uptime: Math.floor(uptime),
        memory: {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          total: Math.round(memoryUsage.heapTotal / 1024 / 1024)
        },
        lowStockProducts,
        pendingOrders,
        recentErrors
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk update products
// @route   PUT /api/admin/products/bulk
// @access  Private/Admin
const bulkUpdateProducts = async (req, res, next) => {
  try {
    const { productIds, updates } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Product IDs array is required'
      });
    }

    const result = await Product.updateMany(
      { _id: { $in: productIds } },
      updates,
      { runValidators: true }
    );

    // Log admin action
    await AdminLog.create({
      admin: req.user._id,
      action: 'bulk_update_products',
      targetModel: 'Product',
      details: `Bulk updated ${result.modifiedCount} products`,
      changes: { productIds, updates }
    });

    adminLogger.info(`Bulk updated ${result.modifiedCount} products by admin: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: `Updated ${result.modifiedCount} products`,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export data
// @route   GET /api/admin/export/:type
// @access  Private/Admin
const exportData = async (req, res, next) => {
  try {
    const { type } = req.params;
    let data;

    switch (type) {
      case 'users':
        data = await User.find({}).select('-password');
        break;
      case 'products':
        data = await Product.find({}).populate('category', 'name');
        break;
      case 'orders':
        data = await Order.find({}).populate('user', 'name email');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    // Log admin action
    await AdminLog.create({
      admin: req.user._id,
      action: 'export_data',
      details: `Exported ${type} data (${data.length} records)`
    });

    adminLogger.info(`Data exported: ${type} by admin: ${req.user.email}`);

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAdminLogs,
  getSystemHealth,
  bulkUpdateProducts,
  exportData
};