const express = require('express');
const {
  getDashboardStats,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAdminLogs,
  getSystemHealth,
  bulkUpdateProducts,
  exportData
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All admin routes are protected
router.use(authorize('admin')); // All admin routes require admin role

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// System management
router.get('/logs', getAdminLogs);
router.get('/health', getSystemHealth);

// Bulk operations
router.put('/products/bulk', bulkUpdateProducts);

// Data export
router.get('/export/:type', exportData);

module.exports = router;