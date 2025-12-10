const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  createPaymentIntent,
  getOrderStats
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

// User routes
router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/cancel', cancelOrder);
router.post('/:id/create-payment-intent', createPaymentIntent);

// Admin routes
router.use(authorize('admin'));

router.get('/', getOrders);
router.get('/stats', getOrderStats);
router.put('/:id/deliver', updateOrderToDelivered);
router.put('/:id/status', updateOrderStatus);

module.exports = router;