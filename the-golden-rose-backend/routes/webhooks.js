const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const { paymentLogger } = require('../utils/logger');
const emailService = require('../config/email');

const router = express.Router();

// @desc    Handle Stripe webhooks
// @route   POST /api/webhooks/stripe
// @access  Public (but verified by Stripe signature)
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    paymentLogger.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handlePaymentSuccess(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      await handlePaymentFailure(failedPayment);
      break;

    case 'charge.dispute.created':
      const dispute = event.data.object;
      await handleDispute(dispute);
      break;

    default:
      paymentLogger.info(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Handle successful payment
const handlePaymentSuccess = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata.orderId;
    
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    if (!order) {
      paymentLogger.error(`Order not found for payment intent: ${paymentIntent.id}`);
      return;
    }

    // Update order status
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: order.user.email
    };

    await order.save();

    // Send payment confirmation email
    try {
      await emailService.sendPaymentConfirmation(order);
    } catch (emailError) {
      paymentLogger.error(`Payment confirmation email failed: ${emailError.message}`);
    }

    paymentLogger.info(`Payment successful for order: ${orderId}, amount: ${paymentIntent.amount_received / 100}`);
  } catch (error) {
    paymentLogger.error(`Error handling payment success: ${error.message}`);
  }
};

// Handle failed payment
const handlePaymentFailure = async (paymentIntent) => {
  try {
    const orderId = paymentIntent.metadata.orderId;
    
    const order = await Order.findById(orderId)
      .populate('user', 'name email');

    if (!order) {
      paymentLogger.error(`Order not found for failed payment: ${paymentIntent.id}`);
      return;
    }

    // Send payment failure notification
    try {
      await emailService.sendPaymentFailure(order, paymentIntent.last_payment_error?.message);
    } catch (emailError) {
      paymentLogger.error(`Payment failure email failed: ${emailError.message}`);
    }

    paymentLogger.warn(`Payment failed for order: ${orderId}, reason: ${paymentIntent.last_payment_error?.message}`);
  } catch (error) {
    paymentLogger.error(`Error handling payment failure: ${error.message}`);
  }
};

// Handle dispute
const handleDispute = async (dispute) => {
  try {
    paymentLogger.warn(`Dispute created: ${dispute.id}, amount: ${dispute.amount / 100}, reason: ${dispute.reason}`);
    
    // You can add logic here to:
    // 1. Notify admins about the dispute
    // 2. Automatically gather evidence
    // 3. Update order status
    // 4. Send notifications to relevant parties
  } catch (error) {
    paymentLogger.error(`Error handling dispute: ${error.message}`);
  }
};

module.exports = router;