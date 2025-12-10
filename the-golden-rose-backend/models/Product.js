const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    enum: [
      'Groceries',
      'Confectionery', 
      'Baking Supplies',
      'Pet Food',
      'Frozen Items',
      'Beverages',
      'Snacks',
      'Dairy',
      'Fresh Produce',
      'Household',
      'Other'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value) {
        return Number(value.toFixed(2)) === value;
      },
      message: 'Price can only have 2 decimal places'
    }
  },
  productImage: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true,
    enum: [
      'Gluten',
      'Dairy',
      'Eggs',
      'Nuts',
      'Peanuts',
      'Soy',
      'Fish',
      'Shellfish',
      'Sesame',
      'Sulphites',
      'Celery',
      'Mustard',
      'Lupin'
    ]
  }],
  nutritionalInfo: {
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    carbohydrates: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    fiber: { type: Number, min: 0 },
    sugar: { type: Number, min: 0 },
    sodium: { type: Number, min: 0 },
    servingSize: { type: String, trim: true }
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  minimumStockLevel: {
    type: Number,
    default: 5,
    min: [0, 'Minimum stock level cannot be negative']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 0,
    min: [0, 'Preparation time cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: [0, 'Total reviews cannot be negative']
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  weight: {
    value: { type: Number, min: 0 },
    unit: { 
      type: String, 
      enum: ['g', 'kg', 'ml', 'l', 'oz', 'lb', 'piece', 'pack'],
      default: 'g'
    }
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    unit: { 
      type: String, 
      enum: ['cm', 'mm', 'in'],
      default: 'cm'
    }
  },
  barcode: {
    type: String,
    trim: true,
    sparse: true
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  origin: {
    type: String,
    trim: true,
    maxlength: [50, 'Origin cannot exceed 50 characters']
  },
  expiryDate: {
    type: Date
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  totalSold: {
    type: Number,
    default: 0,
    min: [0, 'Total sold cannot be negative']
  },
  revenue: {
    type: Number,
    default: 0,
    min: [0, 'Revenue cannot be negative']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
productSchema.index({ category: 1 });
productSchema.index({ productName: 'text', description: 'text' });
productSchema.index({ isAvailable: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ totalSold: -1 });
productSchema.index({ isDeleted: 1 });
productSchema.index({ tags: 1 });

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'out_of_stock';
  if (this.stock <= this.minimumStockLevel) return 'low_stock';
  return 'in_stock';
});

// Virtual for average rating (formatted)
productSchema.virtual('averageRating').get(function() {
  return Math.round(this.rating * 10) / 10;
});

// Virtual for price in pence (for Stripe)
productSchema.virtual('priceInPence').get(function() {
  return Math.round(this.price * 100);
});

// Pre-save middleware to update availability based on stock
productSchema.pre('save', function(next) {
  if (this.stock === 0) {
    this.isAvailable = false;
  }
  next();
});

// Static method to find available products
productSchema.statics.findAvailable = function() {
  return this.find({ 
    isAvailable: true, 
    isDeleted: false,
    stock: { $gt: 0 }
  });
};

// Static method to find low stock products
productSchema.statics.findLowStock = function() {
  return this.find({
    isDeleted: false,
    $expr: { $lte: ['$stock', '$minimumStockLevel'] }
  });
};

// Static method to search products
productSchema.statics.searchProducts = function(query, options = {}) {
  const {
    category,
    minPrice,
    maxPrice,
    tags,
    isVegan,
    isGlutenFree,
    isOrganic,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = -1
  } = options;

  let searchQuery = {
    isDeleted: false,
    isAvailable: true
  };

  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }

  // Category filter
  if (category && category !== 'All') {
    searchQuery.category = category;
  }

  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    searchQuery.price = {};
    if (minPrice !== undefined) searchQuery.price.$gte = minPrice;
    if (maxPrice !== undefined) searchQuery.price.$lte = maxPrice;
  }

  // Tags filter
  if (tags && tags.length > 0) {
    searchQuery.tags = { $in: tags };
  }

  // Dietary filters
  if (isVegan === true) searchQuery.isVegan = true;
  if (isGlutenFree === true) searchQuery.isGlutenFree = true;
  if (isOrganic === true) searchQuery.isOrganic = true;

  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder;

  return this.find(searchQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('reviews', 'rating reviewText createdAt')
    .populate('createdBy', 'firstName lastName');
};

// Instance method to update rating
productSchema.methods.updateRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { productId: this._id } },
    {
      $group: {
        _id: '$productId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.rating = Math.round(stats[0].averageRating * 10) / 10;
    this.totalReviews = stats[0].totalReviews;
  } else {
    this.rating = 0;
    this.totalReviews = 0;
  }

  await this.save();
};

// Instance method to reduce stock
productSchema.methods.reduceStock = function(quantity) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    this.totalSold += quantity;
    this.revenue += (this.price * quantity);
    
    if (this.stock === 0) {
      this.isAvailable = false;
    }
    
    return this.save();
  } else {
    throw new Error('Insufficient stock');
  }
};

// Instance method to increase stock
productSchema.methods.increaseStock = function(quantity) {
  this.stock += quantity;
  if (this.stock > 0) {
    this.isAvailable = true;
  }
  return this.save();
};

// Soft delete
productSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.isAvailable = false;
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);