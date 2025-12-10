const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    pricePerItem: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    productImage: {
      type: String
    },
    specialInstructions: {
      type: String,
      trim: true,
      maxlength: [200, 'Special instructions cannot exceed 200 characters']
    }
  }],
  orderType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: [true, 'Order type is required'],
    default: 'delivery'
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true
  },
  deliveryAddress: {
    type: String,
    required: function() {
      return this.orderType === 'delivery';
    },
    trim: true
  },
  city: {
    type: String,
    required: function() {
      return this.orderType === 'delivery';
    },
    trim: true
  },
  postalCode: {
    type: String,
    required: function() {
      return this.orderType === 'delivery';
    },
    trim: true,
    match: [/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i, 'Please enter a valid UK postcode']
  },
  country: {
    type: String,
    default: 'United Kingdom',
    trim: true
  },
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [500, 'Special instructions cannot exceed 500 characters']
  },
  estimatedDeliveryTime: {
    type: Date
  },
  actualDeliveryTime: {
    type: Date
  },
  orderStatus: {
    type: String,
    enum: [
      'pending',           // Order created, awaiting payment
      'confirmed',         // Payment received
      'processing',        // Being prepared
      'paid',              // Payment confirmed
      'out_for_delivery',  // Dispatched
      'delivered',         // Delivered to customer
      'cancelled'          // Cancelled
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'cash'],
    required: [true, 'Payment method is required']
  },
  paymentId: {
    type: String, // Stripe/PayPal transaction ID
    sparse: true
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    required: [true, 'Tax is required'],
    min: [0, 'Tax cannot be negative']
  },
  deliveryFee: {
    type: Number,
    required: [true, 'Delivery fee is required'],
    min: [0, 'Delivery fee cannot be negative'],
    default: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  finalAmount: {
    type: Number,
    required: [true, 'Final amount is required'],
    min: [0, 'Final amount cannot be negative']
  },
  cancelReason: {
    type: String,
    trim: true
  },
  cancelledAt: {
    type: Date
  },
  refundDetails: {
    refundAmount: {
      type: Number,
      min: [0, 'Refund amount cannot be negative']
    },
    refundMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'bank_transfer']
    },
    refundStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed']
    },
    refundId: String,
    refundedAt: Date
  },
  orderNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Order notes cannot exceed 1000 characters']
  },
  paidAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: {
      type: String,
      trim: true
    }
  }],
  trackingNumber: {
    type: String,
    sparse: true
  },
  deliveryInstructions: {
    type: String,
    trim: true,
    maxlength: [200, 'Delivery instructions cannot exceed 200 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  source: {
    type: String,
    enum: ['website', 'phone', 'admin'],
    default: 'website'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
orderSchema.index({ userId: 1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ customerEmail: 1 });
orderSchema.index({ customerPhone: 1 });
orderSchema.index({ estimatedDeliveryTime: 1 });

// Virtual for order age in hours
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60));
});

// Virtual for formatted order ID
orderSchema.virtual('formattedOrderId').get(function() {
  return `#${this.orderId}`;
});

// Virtual for total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for delivery status
orderSchema.virtual('deliveryStatus').get(function() {
  if (this.orderType === 'pickup') return 'pickup';
  
  switch (this.orderStatus) {
    case 'pending':
    case 'confirmed':
    case 'processing':
      return 'preparing';
    case 'out_for_delivery':
      return 'in_transit';
    case 'delivered':
      return 'delivered';
    case 'cancelled':
      return 'cancelled';
    default:
      return 'unknown';
  }
});

// Pre-save middleware to generate order ID
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderId) {
    const count = await this.constructor.countDocuments();
    this.orderId = `ORD-${String(count + 1).padStart(5, '0')}`;
  }
  
  // Calculate totals if not set
  if (this.isModified('items') || this.isNew) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    this.tax = Math.round(this.subtotal * 0.20 * 100) / 100; // 20% VAT
    this.totalAmount = this.subtotal + this.tax;
    this.finalAmount = this.totalAmount + this.deliveryFee - this.discount;
  }
  
  // Set delivery fee based on order type
  if (this.orderType === 'pickup') {
    this.deliveryFee = 0;
  } else if (this.deliveryFee === undefined) {
    this.deliveryFee = this.subtotal >= 25 ? 0 : 2.99; // Free delivery over £25
  }
  
  next();
});

// Pre-save middleware to track status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('orderStatus') && !this.isNew) {
    this.statusHistory.push({
      status: this.orderStatus,
      timestamp: new Date(),
      updatedBy: this.lastUpdatedBy || null
    });
    
    // Set specific timestamps
    switch (this.orderStatus) {
      case 'paid':
      case 'confirmed':
        if (!this.paidAt) this.paidAt = new Date();
        break;
      case 'delivered':
        if (!this.deliveredAt) this.deliveredAt = new Date();
        if (!this.actualDeliveryTime) this.actualDeliveryTime = new Date();
        break;
      case 'cancelled':
        if (!this.cancelledAt) this.cancelledAt = new Date();
        break;
    }
  }
  next();
});

// Static method to generate order ID
orderSchema.statics.generateOrderId = async function() {
  const count = await this.countDocuments();
  return `ORD-${String(count + 1).padStart(5, '0')}`;
};

// Static method to find orders by status
orderSchema.statics.findByStatus = function(status) {
  return this.find({ orderStatus: status })
    .populate('userId', 'firstName lastName email')
    .populate('items.productId', 'productName productImage')
    .sort({ createdAt: -1 });
};

// Static method to find orders by date range
orderSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }).sort({ createdAt: -1 });
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function(startDate, endDate) {
  const matchStage = {};
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$finalAmount' },
        averageOrderValue: { $avg: '$finalAmount' },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0] }
        },
        confirmedOrders: {
          $sum: { $cond: [{ $eq: ['$orderStatus', 'confirmed'] }, 1, 0] }
        },
        processingOrders: {
          $sum: { $cond: [{ $eq: ['$orderStatus', 'processing'] }, 1, 0] }
        },
        deliveredOrders: {
          $sum: { $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$orderStatus', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  };
};

// Instance method to update status
orderSchema.methods.updateStatus = function(newStatus, updatedBy, notes) {
  this.orderStatus = newStatus;
  this.lastUpdatedBy = updatedBy;
  
  if (notes) {
    this.orderNotes = notes;
  }
  
  return this.save();
};

// Instance method to cancel order
orderSchema.methods.cancelOrder = function(reason, cancelledBy) {
  this.orderStatus = 'cancelled';
  this.cancelReason = reason;
  this.cancelledAt = new Date();
  this.lastUpdatedBy = cancelledBy;
  
  return this.save();
};

// Instance method to process refund
orderSchema.methods.processRefund = function(refundAmount, refundMethod, refundId) {
  this.refundDetails = {
    refundAmount: refundAmount || this.finalAmount,
    refundMethod,
    refundStatus: 'processing',
    refundId,
    refundedAt: new Date()
  };
  
  this.paymentStatus = 'refunded';
  
  return this.save();
};

// Instance method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['delivered', 'cancelled', 'out_for_delivery'];
  return !nonCancellableStatuses.includes(this.orderStatus);
};

// Instance method to check if order is overdue
orderSchema.methods.isOverdue = function() {
  if (!this.estimatedDeliveryTime) return false;
  return new Date() > this.estimatedDeliveryTime && this.orderStatus !== 'delivered';
};

module.exports = mongoose.model('Order', orderSchema);