const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required for verified purchase']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviewTitle: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    maxlength: [1000, 'Review text cannot exceed 1000 characters']
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: true
  },
  helpfulCount: {
    type: Number,
    default: 0,
    min: [0, 'Helpful count cannot be negative']
  },
  helpfulVotes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isHelpful: {
      type: Boolean,
      required: true
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isApproved: {
    type: Boolean,
    default: true
  },
  moderationNotes: {
    type: String,
    trim: true
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  response: {
    text: {
      type: String,
      trim: true,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: {
      type: Date
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
reviewSchema.index({ productId: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ isApproved: 1 });
reviewSchema.index({ helpfulCount: -1 });

// Compound index for unique user-product-order combination
reviewSchema.index({ userId: 1, productId: 1, orderId: 1 }, { unique: true });

// Virtual for review age
reviewSchema.virtual('reviewAge').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
});

// Virtual for star display
reviewSchema.virtual('starDisplay').get(function() {
  return '★'.repeat(this.rating) + '☆'.repeat(5 - this.rating);
});

// Pre-save middleware to update product rating
reviewSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  const product = await Product.findById(this.productId);
  if (product) {
    await product.updateRating();
  }
});

// Pre-remove middleware to update product rating
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(doc.productId);
    if (product) {
      await product.updateRating();
    }
  }
});

// Static method to get reviews for a product
reviewSchema.statics.getProductReviews = function(productId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = -1,
    rating = null
  } = options;

  let query = { 
    productId, 
    isApproved: true 
  };

  if (rating) {
    query.rating = rating;
  }

  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder;

  return this.find(query)
    .populate('userId', 'firstName lastName profileImage')
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Static method to get review statistics
reviewSchema.statics.getReviewStats = async function(productId) {
  const stats = await this.aggregate([
    { $match: { productId: mongoose.Types.ObjectId(productId), isApproved: true } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    }
  ]);

  const ratingDistribution = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  };

  stats.forEach(stat => {
    ratingDistribution[stat._id] = stat.count;
  });

  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);
  const averageRating = totalReviews > 0 
    ? Object.entries(ratingDistribution).reduce((sum, [rating, count]) => sum + (rating * count), 0) / totalReviews
    : 0;

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution
  };
};

// Instance method to vote helpful
reviewSchema.methods.voteHelpful = function(userId, isHelpful) {
  // Remove existing vote from this user
  this.helpfulVotes = this.helpfulVotes.filter(
    vote => vote.userId.toString() !== userId.toString()
  );

  // Add new vote
  this.helpfulVotes.push({
    userId,
    isHelpful,
    votedAt: new Date()
  });

  // Update helpful count
  this.helpfulCount = this.helpfulVotes.filter(vote => vote.isHelpful).length;

  return this.save();
};

// Instance method to add response
reviewSchema.methods.addResponse = function(responseText, respondedBy) {
  this.response = {
    text: responseText,
    respondedBy,
    respondedAt: new Date()
  };

  return this.save();
};

module.exports = mongoose.model('Review', reviewSchema);