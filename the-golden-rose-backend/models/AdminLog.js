const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Admin ID is required']
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: [
      // Order actions
      'order_status_updated',
      'order_cancelled',
      'order_refunded',
      'order_notes_added',
      
      // Product actions
      'product_created',
      'product_updated',
      'product_deleted',
      'product_restored',
      'product_stock_updated',
      
      // User actions
      'user_role_changed',
      'user_status_changed',
      'user_deleted',
      
      // Category actions
      'category_created',
      'category_updated',
      'category_deleted',
      
      // Review actions
      'review_approved',
      'review_rejected',
      'review_deleted',
      'review_responded',
      
      // System actions
      'settings_updated',
      'bulk_operation',
      'data_export',
      'data_import',
      
      // Authentication actions
      'admin_login',
      'admin_logout',
      'password_changed',
      
      // Payment actions
      'refund_processed',
      'payment_verified',
      
      // Other actions
      'other'
    ]
  },
  targetType: {
    type: String,
    required: [true, 'Target type is required'],
    enum: ['Order', 'Product', 'User', 'Category', 'Review', 'System', 'Payment', 'Other']
  },
  targetId: {
    type: String,
    required: [true, 'Target ID is required']
  },
  targetName: {
    type: String,
    trim: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  previousValues: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  newValues: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  ipAddress: {
    type: String,
    required: [true, 'IP address is required']
  },
  userAgent: {
    type: String,
    trim: true
  },
  sessionId: {
    type: String,
    trim: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  },
  errorMessage: {
    type: String,
    trim: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
adminLogSchema.index({ adminId: 1 });
adminLogSchema.index({ action: 1 });
adminLogSchema.index({ targetType: 1 });
adminLogSchema.index({ targetId: 1 });
adminLogSchema.index({ createdAt: -1 });
adminLogSchema.index({ severity: 1 });
adminLogSchema.index({ status: 1 });
adminLogSchema.index({ ipAddress: 1 });

// Compound indexes
adminLogSchema.index({ adminId: 1, createdAt: -1 });
adminLogSchema.index({ targetType: 1, targetId: 1 });
adminLogSchema.index({ action: 1, createdAt: -1 });

// Virtual for log age
adminLogSchema.virtual('logAge').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 30) return `${diffDays} days ago`;
  return this.createdAt.toLocaleDateString();
});

// Virtual for formatted action
adminLogSchema.virtual('formattedAction').get(function() {
  return this.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
});

// Static method to log admin action
adminLogSchema.statics.logAction = async function(logData) {
  const {
    adminId,
    action,
    targetType,
    targetId,
    targetName,
    description,
    changes = {},
    previousValues = {},
    newValues = {},
    ipAddress,
    userAgent,
    sessionId,
    severity = 'medium',
    status = 'success',
    errorMessage,
    metadata = {}
  } = logData;

  const log = new this({
    adminId,
    action,
    targetType,
    targetId,
    targetName,
    description,
    changes,
    previousValues,
    newValues,
    ipAddress,
    userAgent,
    sessionId,
    severity,
    status,
    errorMessage,
    metadata
  });

  return await log.save();
};

// Static method to get logs by admin
adminLogSchema.statics.getLogsByAdmin = function(adminId, options = {}) {
  const {
    page = 1,
    limit = 50,
    startDate,
    endDate,
    action,
    targetType,
    severity
  } = options;

  let query = { adminId };

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if (action) query.action = action;
  if (targetType) query.targetType = targetType;
  if (severity) query.severity = severity;

  const skip = (page - 1) * limit;

  return this.find(query)
    .populate('adminId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Static method to get logs by target
adminLogSchema.statics.getLogsByTarget = function(targetType, targetId, options = {}) {
  const {
    page = 1,
    limit = 20
  } = options;

  const skip = (page - 1) * limit;

  return this.find({ targetType, targetId })
    .populate('adminId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Static method to get recent logs
adminLogSchema.statics.getRecentLogs = function(limit = 100) {
  return this.find()
    .populate('adminId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get log statistics
adminLogSchema.statics.getLogStats = async function(startDate, endDate) {
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
        totalLogs: { $sum: 1 },
        actionBreakdown: {
          $push: '$action'
        },
        severityBreakdown: {
          $push: '$severity'
        },
        adminBreakdown: {
          $push: '$adminId'
        }
      }
    },
    {
      $project: {
        totalLogs: 1,
        actionCounts: {
          $reduce: {
            input: '$actionBreakdown',
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                {
                  $arrayToObject: [[{
                    k: '$$this',
                    v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                  }]]
                }
              ]
            }
          }
        },
        severityCounts: {
          $reduce: {
            input: '$severityBreakdown',
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                {
                  $arrayToObject: [[{
                    k: '$$this',
                    v: { $add: [{ $ifNull: [{ $getField: { field: '$$this', input: '$$value' } }, 0] }, 1] }
                  }]]
                }
              ]
            }
          }
        }
      }
    }
  ]);

  return stats[0] || {
    totalLogs: 0,
    actionCounts: {},
    severityCounts: {}
  };
};

// Static method to cleanup old logs
adminLogSchema.statics.cleanupOldLogs = function(daysToKeep = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  return this.deleteMany({
    createdAt: { $lt: cutoffDate },
    severity: { $in: ['low', 'medium'] } // Keep high and critical logs longer
  });
};

// Static method to export logs
adminLogSchema.statics.exportLogs = async function(filters = {}) {
  const {
    startDate,
    endDate,
    adminId,
    action,
    targetType,
    severity
  } = filters;

  let query = {};

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if (adminId) query.adminId = adminId;
  if (action) query.action = action;
  if (targetType) query.targetType = targetType;
  if (severity) query.severity = severity;

  return this.find(query)
    .populate('adminId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .lean();
};

// Instance method to mark as reviewed
adminLogSchema.methods.markAsReviewed = function(reviewedBy) {
  this.metadata.reviewedBy = reviewedBy;
  this.metadata.reviewedAt = new Date();
  return this.save();
};

// Instance method to add note
adminLogSchema.methods.addNote = function(note, addedBy) {
  if (!this.metadata.notes) {
    this.metadata.notes = [];
  }
  
  this.metadata.notes.push({
    text: note,
    addedBy,
    addedAt: new Date()
  });
  
  return this.save();
};

module.exports = mongoose.model('AdminLog', adminLogSchema);