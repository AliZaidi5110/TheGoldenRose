const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: Use Gmail SMTP
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password
      },
      secure: true,
      port: 465,
    });
  } else {
    // Development: Use Ethereal for testing
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass',
      },
    });
  }
};

// Initialize transporter
let transporter;

const initializeEmailService = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      transporter = createTransporter();
    } else {
      // Create test account for development
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransporter({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Verify transporter
    await transporter.verify();
    logger.info('Email service initialized successfully');
    
    return transporter;
  } catch (error) {
    logger.error(`Failed to initialize email service: ${error.message}`);
    throw error;
  }
};

// Email configuration
const emailConfig = {
  from: {
    name: process.env.BUSINESS_NAME || 'The Golden Rose',
    address: process.env.EMAIL_FROM || 'noreply@thegoldenrose.com',
  },
  adminEmail: process.env.ADMIN_EMAIL || 'admin@thegoldenrose.com',
  supportEmail: process.env.SUPPORT_EMAIL || 'support@thegoldenrose.com',
  supportPhone: process.env.SUPPORT_PHONE || '+447396890670',
};

// Helper function to send email
const sendEmail = async (mailOptions) => {
  try {
    if (!transporter) {
      await initializeEmailService();
    }

    // Set default from address
    if (!mailOptions.from) {
      mailOptions.from = `${emailConfig.from.name} <${emailConfig.from.address}>`;
    }

    const info = await transporter.sendMail(mailOptions);
    
    logger.info(`Email sent successfully: ${info.messageId}`);
    
    // Log preview URL for development
    if (process.env.NODE_ENV !== 'production') {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    
    return info;
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  // Order confirmation email to customer
  orderConfirmationCustomer: (order) => ({
    to: order.customerEmail,
    subject: `Order Confirmation #${order.orderId} - The Golden Rose`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #301934; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .item-row { border-bottom: 1px solid #eee; padding: 10px 0; }
          .total-row { font-weight: bold; font-size: 18px; color: #301934; }
          .button { background: #301934; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <h2>Dear ${order.customerName},</h2>
            <p>Thank you for your order! Your order has been received and is being processed.</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> #${order.orderId}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
              <p><strong>Estimated Delivery:</strong> ${order.estimatedDeliveryTime ? new Date(order.estimatedDeliveryTime).toLocaleDateString('en-GB') : 'TBD'}</p>
              
              <h4>Items Ordered:</h4>
              ${order.items.map(item => `
                <div class="item-row">
                  <strong>${item.productName}</strong><br>
                  Quantity: ${item.quantity} × £${item.pricePerItem.toFixed(2)} = £${item.subtotal.toFixed(2)}
                </div>
              `).join('')}
              
              <div class="item-row">
                <strong>Subtotal:</strong> £${order.subtotal.toFixed(2)}
              </div>
              <div class="item-row">
                <strong>Tax (20%):</strong> £${order.tax.toFixed(2)}
              </div>
              <div class="item-row">
                <strong>Delivery Fee:</strong> £${order.deliveryFee.toFixed(2)}
              </div>
              <div class="item-row total-row">
                <strong>Total Amount:</strong> £${order.finalAmount.toFixed(2)}
              </div>
            </div>
            
            ${order.orderType === 'delivery' ? `
              <div class="order-details">
                <h4>Delivery Address:</h4>
                <p>${order.deliveryAddress}<br>
                ${order.city}, ${order.postalCode}<br>
                ${order.country}</p>
              </div>
            ` : ''}
            
            <p>You can track your order status at any time:</p>
            <a href="${process.env.FRONTEND_URL}/track/${order.orderId}" class="button">Track Your Order</a>
            
            <p>If you have any questions, please contact us:</p>
            <ul>
              <li>Email: ${emailConfig.supportEmail}</li>
              <li>Phone: ${emailConfig.supportPhone}</li>
            </ul>
          </div>
          <div class="footer">
            <p>Thank you for choosing The Golden Rose!</p>
            <p>8 High Street, Newhaven BN9 9PE, UK</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Order confirmation email to admin
  orderConfirmationAdmin: (order) => ({
    to: emailConfig.adminEmail,
    subject: `🚀 NEW ORDER #${order.orderId} from ${order.customerName} - REQUIRES ATTENTION`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; }
          .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 6px; }
          .order-details { background: white; padding: 20px; margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; }
          .item-row { border-bottom: 1px solid #eee; padding: 10px 0; }
          .total-row { font-weight: bold; font-size: 18px; color: #28a745; }
          .button { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
          .urgent { background: #dc3545; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 NEW ORDER RECEIVED</h1>
          </div>
          
          <div class="alert">
            <h3>Order ID: <span style="color: #007bff; font-size: 20px;">#${order.orderId}</span></h3>
            <p><strong>Status:</strong> <span style="color: #ff6b6b;">PENDING PAYMENT</span></p>
            <p><strong>Created:</strong> ${new Date(order.createdAt).toLocaleString('en-GB')}</p>
          </div>
          
          <div class="order-details">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
            ${order.orderType === 'delivery' ? `
              <p><strong>Delivery Address:</strong><br>
              ${order.deliveryAddress}<br>
              ${order.city}, ${order.postalCode}<br>
              ${order.country}</p>
            ` : '<p><strong>Order Type:</strong> Pickup</p>'}
          </div>
          
          <div class="order-details">
            <h3>Order Items</h3>
            <table>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
              ${order.items.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>£${item.pricePerItem.toFixed(2)}</td>
                  <td>£${item.subtotal.toFixed(2)}</td>
                </tr>
              `).join('')}
            </table>
            
            <div class="item-row">
              <strong>Subtotal:</strong> £${order.subtotal.toFixed(2)}
            </div>
            <div class="item-row">
              <strong>Tax (20% VAT):</strong> £${order.tax.toFixed(2)}
            </div>
            <div class="item-row">
              <strong>Delivery Fee:</strong> £${order.deliveryFee.toFixed(2)}
            </div>
            <div class="item-row total-row">
              <strong>Total Amount:</strong> £${order.finalAmount.toFixed(2)}
            </div>
            
            <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
            <p><strong>Order Type:</strong> ${order.orderType.toUpperCase()}</p>
          </div>
          
          <div class="order-details">
            <h3>Admin Actions</h3>
            <p>This order requires your attention. Customer payment status: ${order.paymentStatus}</p>
            <a href="${process.env.FRONTEND_URL}/admin/orders/${order._id}" class="button">View Order Details</a>
            <a href="${process.env.FRONTEND_URL}/admin/orders" class="button">Go to Orders Dashboard</a>
          </div>
          
          <div style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
            <p>Sent at: ${new Date().toLocaleString('en-GB')}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Order status update email
  orderStatusUpdate: (order, newStatus) => ({
    to: order.customerEmail,
    subject: `Order #${order.orderId} Status Update - ${newStatus.replace('_', ' ').toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Status Update</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #301934; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .status-badge { background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
          .button { background: #301934; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
          </div>
          <div class="content">
            <h2>Dear ${order.customerName},</h2>
            <p>Your order status has been updated!</p>
            
            <p><strong>Order ID:</strong> #${order.orderId}</p>
            <p><strong>New Status:</strong> <span class="status-badge">${newStatus.replace('_', ' ').toUpperCase()}</span></p>
            
            <h3>What's Next?</h3>
            ${getStatusMessage(newStatus)}
            
            ${order.estimatedDeliveryTime ? `
              <p><strong>Estimated Delivery Time:</strong> ${new Date(order.estimatedDeliveryTime).toLocaleString('en-GB')}</p>
            ` : ''}
            
            <a href="${process.env.FRONTEND_URL}/track/${order.orderId}" class="button">Track Your Order</a>
            
            <p>If you have any questions, please contact us at ${emailConfig.supportEmail} or call ${emailConfig.supportPhone}</p>
          </div>
          <div class="footer">
            <p>Thank you for choosing The Golden Rose!</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Helper function to get status message
const getStatusMessage = (status) => {
  const messages = {
    confirmed: '<p>✅ Your payment has been received. Your order is now being prepared.</p>',
    processing: '<p>👨‍🍳 Your order is being prepared. Thank you for your patience!</p>',
    out_for_delivery: '<p>🚚 Your order is on the way! You\'ll receive it soon.</p>',
    delivered: '<p>✨ Your order has been delivered! We hope you enjoy your purchase.</p>',
    cancelled: '<p>❌ Your order has been cancelled. If you have any questions, please contact us.</p>',
  };
  
  return messages[status] || '<p>Your order status has been updated.</p>';
};

module.exports = {
  initializeEmailService,
  sendEmail,
  emailConfig,
  emailTemplates,
};