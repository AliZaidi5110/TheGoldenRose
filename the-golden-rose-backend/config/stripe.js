const Stripe = require('stripe');
const logger = require('../utils/logger');

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe configuration
const stripeConfig = {
  apiVersion: '2023-10-16',
  maxNetworkRetries: 3,
  timeout: 20000, // 20 seconds
};

// Helper function to create payment intent
const createPaymentIntent = async (amount, currency = 'gbp', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    logger.logPayment(
      'payment_intent_created',
      metadata.orderId,
      amount,
      'stripe',
      'pending',
      paymentIntent.id
    );

    return paymentIntent;
  } catch (error) {
    logger.logPayment(
      'payment_intent_creation_failed',
      metadata.orderId,
      amount,
      'stripe',
      'failed',
      null,
      error
    );
    throw error;
  }
};

// Helper function to confirm payment intent
const confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    logger.logPayment(
      'payment_intent_confirmed',
      paymentIntent.metadata.orderId,
      paymentIntent.amount / 100,
      'stripe',
      paymentIntent.status,
      paymentIntentId
    );

    return paymentIntent;
  } catch (error) {
    logger.logPayment(
      'payment_intent_confirmation_failed',
      null,
      null,
      'stripe',
      'failed',
      paymentIntentId,
      error
    );
    throw error;
  }
};

// Helper function to retrieve payment intent
const retrievePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    logger.error(`Failed to retrieve payment intent ${paymentIntentId}: ${error.message}`);
    throw error;
  }
};

// Helper function to create refund
const createRefund = async (paymentIntentId, amount = null, reason = 'requested_by_customer') => {
  try {
    const refundData = {
      payment_intent: paymentIntentId,
      reason,
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to pence
    }

    const refund = await stripe.refunds.create(refundData);

    logger.logPayment(
      'refund_created',
      null,
      refund.amount / 100,
      'stripe',
      refund.status,
      refund.id
    );

    return refund;
  } catch (error) {
    logger.logPayment(
      'refund_creation_failed',
      null,
      amount,
      'stripe',
      'failed',
      paymentIntentId,
      error
    );
    throw error;
  }
};

// Helper function to create customer
const createCustomer = async (customerData) => {
  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: `${customerData.firstName} ${customerData.lastName}`,
      phone: customerData.phoneNumber,
      address: {
        line1: customerData.address,
        city: customerData.city,
        postal_code: customerData.postalCode,
        country: 'GB',
      },
      metadata: {
        userId: customerData.userId,
      },
    });

    logger.info(`Stripe customer created: ${customer.id} for user ${customerData.userId}`);
    return customer;
  } catch (error) {
    logger.error(`Failed to create Stripe customer: ${error.message}`);
    throw error;
  }
};

// Helper function to update customer
const updateCustomer = async (customerId, updateData) => {
  try {
    const customer = await stripe.customers.update(customerId, updateData);
    logger.info(`Stripe customer updated: ${customerId}`);
    return customer;
  } catch (error) {
    logger.error(`Failed to update Stripe customer ${customerId}: ${error.message}`);
    throw error;
  }
};

// Helper function to create setup intent for saving payment methods
const createSetupIntent = async (customerId) => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return setupIntent;
  } catch (error) {
    logger.error(`Failed to create setup intent for customer ${customerId}: ${error.message}`);
    throw error;
  }
};

// Helper function to list customer payment methods
const listPaymentMethods = async (customerId) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods;
  } catch (error) {
    logger.error(`Failed to list payment methods for customer ${customerId}: ${error.message}`);
    throw error;
  }
};

// Helper function to construct webhook event
const constructWebhookEvent = (payload, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    return event;
  } catch (error) {
    logger.error(`Webhook signature verification failed: ${error.message}`);
    throw error;
  }
};

// Helper function to handle webhook events
const handleWebhookEvent = async (event) => {
  logger.info(`Received Stripe webhook: ${event.type}`);

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentIntentFailed(event.data.object);
      break;
    case 'refund.created':
      await handleRefundCreated(event.data.object);
      break;
    case 'refund.updated':
      await handleRefundUpdated(event.data.object);
      break;
    default:
      logger.info(`Unhandled webhook event type: ${event.type}`);
  }
};

// Handle successful payment
const handlePaymentIntentSucceeded = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  
  logger.logPayment(
    'payment_succeeded',
    orderId,
    paymentIntent.amount / 100,
    'stripe',
    'success',
    paymentIntent.id
  );

  // Update order status in database
  const Order = require('../models/Order');
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = 'completed';
      order.orderStatus = 'confirmed';
      order.paymentId = paymentIntent.id;
      order.paidAt = new Date();
      await order.save();

      // Send confirmation email
      const emailService = require('../services/emailService');
      await emailService.sendOrderConfirmation(order);
    }
  } catch (error) {
    logger.error(`Failed to update order ${orderId} after successful payment: ${error.message}`);
  }
};

// Handle failed payment
const handlePaymentIntentFailed = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  
  logger.logPayment(
    'payment_failed',
    orderId,
    paymentIntent.amount / 100,
    'stripe',
    'failed',
    paymentIntent.id
  );

  // Update order status in database
  const Order = require('../models/Order');
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = 'failed';
      await order.save();

      // Send payment failed email
      const emailService = require('../services/emailService');
      await emailService.sendPaymentFailedEmail(order);
    }
  } catch (error) {
    logger.error(`Failed to update order ${orderId} after failed payment: ${error.message}`);
  }
};

// Handle refund created
const handleRefundCreated = async (refund) => {
  logger.logPayment(
    'refund_processed',
    null,
    refund.amount / 100,
    'stripe',
    refund.status,
    refund.id
  );

  // Update refund status in database
  const Refund = require('../models/Refund');
  try {
    const refundRecord = await Refund.findOne({ stripeRefundId: refund.id });
    if (refundRecord) {
      refundRecord.refundStatus = 'completed';
      refundRecord.completedAt = new Date();
      await refundRecord.save();
    }
  } catch (error) {
    logger.error(`Failed to update refund record for Stripe refund ${refund.id}: ${error.message}`);
  }
};

// Handle refund updated
const handleRefundUpdated = async (refund) => {
  logger.info(`Stripe refund updated: ${refund.id} - Status: ${refund.status}`);
};

module.exports = {
  stripe,
  createPaymentIntent,
  confirmPaymentIntent,
  retrievePaymentIntent,
  createRefund,
  createCustomer,
  updateCustomer,
  createSetupIntent,
  listPaymentMethods,
  constructWebhookEvent,
  handleWebhookEvent,
};