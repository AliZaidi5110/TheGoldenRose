const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  refundId: {
    type: String,
    unique: true,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  refundAmount: {
    type: Number,
    required: [true, 'Refund amount is required'],
    min: [0, 'Refund amount cannot be negative']
  },
  originalAmount: {
    type: Number,
    required: [true, 'Original amount is required'],
    min: [0, 'Original amount cannot be negative']
  },
  refundType: {
    type: String,
    enum: ['full', 'partial'],
    required: [true, 'Refund type is required']
  },
  refundReason: {
    type: String,
    required: [true, 'Refund reason is required'],
    enum: [
      'damaged_product',
      'wrong_product',
      'not_as_described',
      'late_delivery',
      'customer_changed_mind',
      'duplicate_order',
      'payment_error',
      'out_of_stock',
      'quality_issue',
      'other'
    ]
  },
  refundReasonDetails: {
    type: String,
    trim: true,
    maxlength: [500, 'Refund reason details cannot exceed 500 characters']
  },
  refundStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'bank_transfer', 'store_credit'],
    required: [true, 'Payment method is required']
  },
  refundMethod: {
    type: String,
    enum: ['original_payment', 'bank_transfer', 'store_credit', 'cash'],
    default: 'original_payment'
  },
  stripeRefundId: {
    type: String,
    sparse: true
  },
  paypalRefundId: {
    type: String,
    sparse: true
  },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    sortCode: String,
    bankName: String
  },
  refundItems: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName: String,
    quantity: {
      type: Number,
      min: [1, 'Quantity must be at least 1']
    },
    pricePerItem: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    refundAmount: {
      type: Number,
      min: [0, 'Refund amount cannot be negative']
    },
    reason: String
  }],
  customerNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  rejectionReason: {
    type: String,
    trim: true,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters']
  },
  evidence: [{
    type: {
      type: String,
      enum: ['image', 'document', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    publicId: String,
    filename: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  estimatedProcessingTime: {
    type: Number, // in business days
    default: 5
  },
  actualProcessingTime: {
    type: Number // in business days
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
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
    notes: String
  }],
  communicationLog: [{
    type: {
      type: String,
      enum: ['email', 'phone', 'chat', 'internal_note'],
      required: true
    },
    direction: {
      type: String,
      enum: ['inbound', 'outbound'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isUrgent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
refundSchema.index({ refundId: 1 });
refundSchema.index({ orderId: 1 });
refundSchema.index({ userId: 1 });
refundSchema.index({ refundStatus: 1 });
refundSchema.index({ createdAt: -1 });
refundSchema.index({ processedAt: 1 });
refundSchema.index({ priority: 1 });
refundSchema.index({ isUrgent: 1 });

// Virtual for refund age in days
refundSchema.virtual('refundAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for formatted refund ID
refundSchema.virtual('formattedRefundId').get(function() {
  return `REF-${this.refundId}`;
});

// Virtual for processing time status
refundSchema.virtual('processingTimeStatus').get(function() {
  if (this.refundStatus === 'completed') {
    return this.actualProcessingTime <= this.estimatedProcessingTime ? 'on_time' : 'delayed';
  }
  
  const daysSinceCreated = this.refundAge;
  if (daysSinceCreated > this.estimatedProcessingTime) {
    return 'overdue';
  }
  
  return 'on_track';
});

// Pre-save middleware to generate refund ID
refundSchema.pre('save', async function(next) {
  if (this.isNew && !this.refundId) {
    const count = await this.constructor.countDocuments();
    this.refundId = String(count + 1).padStart(6, '0');
  }
  next();
});

// Pre-save middleware to track status changes
refundSchema.pre('save', function(next) {
  if (this.isModified('refundStatus') && !this.isNew) {
    this.statusHistory.push({
      status: this.refundStatus,
      timestamp: new Date(),
      updatedBy: this.lastUpdatedBy || null
    });
    
    // Set specific timestamps
    switch (this.refundStatus) {
      case 'approved':
        if (!this.approvedAt) this.approvedAt = new Date();
        break;
      case 'rejected':
        if (!this.rejectedAt) this.rejectedAt = new Date();
        break;
      case 'processing':
        if (!this.processedAt) this.processedAt = new Date();
        break;
      case 'completed':
        if (!this.completedAt) this.completedAt = new Date();
        this.actualProcessingTime = Math.floor((this.completedAt - this.createdAt) / (1000 * 60 * 60 * 24));
        break;
    }
  }
  next();
});

// Static method to generate refund ID
refundSchema.statics.generateRefundId = async function() {
  const count = await this.countDocuments();
  return String(count + 1).padStart(6, '0');
};

// Static method to find refunds by status
refundSchema.statics.findByStatus = function(status) {
  return this.find({ refundStatus: status })
    .populate('orderId', 'orderId customerName customerEmail')
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to find pending refunds
refundSchema.statics.findPending = function() {
  return this.find({ refundStatus: 'pending' })
    .populate('orderId', 'orderId customerName customerEmail finalAmount')
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: 1 }); // Oldest first for FIFO processing
};

// Static method to find overdue refunds
refundSchema.statics.findOverdue = function() {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 5); // Default 5 business days
  
  return this.find({
    refundStatus: { $in: ['pending', 'approved', 'processing'] },
    createdAt: { $lt: cutoffDate }
  })
  .populate('orderId', 'orderId customerName')
  .populate('userId', 'firstName lastName email')
  .sort({ createdAt: 1 });
};

// Static method to get refund statistics
refundSchema.statics.getRefundStats = async function(startDate, endDate) {
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
        totalRefunds: { $sum: 1 },
        totalRefundAmount: { $sum: '$refundAmount' },
        averageRefundAmount: { $avg: '$refundAmount' },
        pendingRefunds: {
          $sum: { $cond: [{ $eq: ['$refundStatus', 'pending'] }, 1, 0] }
        },
        approvedRefunds: {
          $sum: { $cond: [{ $eq: ['$refundStatus', 'approved'] }, 1, 0] }
        },
        completedRefunds: {
          $sum: { $cond: [{ $eq: ['$refundStatus', 'completed'] }, 1, 0] }
        },
        rejectedRefunds: {
          $sum: { $cond: [{ $eq: ['$refundStatus', 'rejected'] }, 1, 0] }
        },
        averageProcessingTime: { $avg: '$actualProcessingTime' }
      }
    }
  ]);

  return stats[0] || {
    totalRefunds: 0,
    totalRefundAmount: 0,
    averageRefundAmount: 0,
    pendingRefunds: 0,
    approvedRefunds: 0,
    completedRefunds: 0,
    rejectedRefunds: 0,
    averageProcessingTime: 0
  };
};

// Instance method to approve refund
refundSchema.methods.approve = function(approvedBy, adminNotes) {
  this.refundStatus = 'approved';
  this.approvedBy = approvedBy;
  this.approvedAt = new Date();
  if (adminNotes) this.adminNotes = adminNotes;
  this.lastUpdatedBy = approvedBy;
  
  return this.save();
};

// Instance method to reject refund
refundSchema.methods.reject = function(rejectedBy, rejectionReason, adminNotes) {
  this.refundStatus = 'rejected';
  this.rejectedBy = rejectedBy;
  this.rejectedAt = new Date();
  this.rejectionReason = rejectionReason;
  if (adminNotes) this.adminNotes = adminNotes;
  this.lastUpdatedBy = rejectedBy;
  
  return this.save();
};

// Instance method to start processing
refundSchema.methods.startProcessing = function(processedBy) {
  this.refundStatus = 'processing';
  this.processedBy = processedBy;
  this.processedAt = new Date();
  this.lastUpdatedBy = processedBy;
  
  return this.save();
};

// Instance method to complete refund
refundSchema.methods.complete = function(completedBy, refundId) {
  this.refundStatus = 'completed';
  this.completedAt = new Date();
  this.lastUpdatedBy = completedBy;
  
  if (this.paymentMethod === 'stripe' && refundId) {
    this.stripeRefundId = refundId;
  } else if (this.paymentMethod === 'paypal' && refundId) {
    this.paypalRefundId = refundId;
  }
  
  return this.save();
};

// Instance method to add communication log
refundSchema.methods.addCommunication = function(type, direction, content, sentBy) {
  this.communicationLog.push({
    type,
    direction,
    content,
    sentBy,
    timestamp: new Date()
  });
  
  return this.save();
};

// Instance method to add evidence
refundSchema.methods.addEvidence = function(evidenceData) {
  this.evidence.push({
    ...evidenceData,
    uploadedAt: new Date()
  });
  
  return this.save();
};

// Instance method to calculate refund amount
refundSchema.methods.calculateRefundAmount = function() {
  if (this.refundType === 'full') {
    return this.originalAmount;
  }
  
  // For partial refunds, sum up individual item refunds
  return this.refundItems.reduce((total, item) => total + item.refundAmount, 0);
};

module.exports = mongoose.model('Refund', refundSchema);