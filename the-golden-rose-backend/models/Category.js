const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  categoryDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Category description cannot exceed 200 characters']
  },
  categoryImage: {
    url: {
      type: String,
      required: [true, 'Category image URL is required']
    },
    publicId: {
      type: String,
      required: [true, 'Category image public ID is required']
    },
    alt: {
      type: String,
      default: ''
    }
  },
  displayOrder: {
    type: Number,
    default: 0,
    min: [0, 'Display order cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  productCount: {
    type: Number,
    default: 0,
    min: [0, 'Product count cannot be negative']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  featuredProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
categorySchema.index({ categoryName: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isDeleted: 1 });

// Virtual for full category path
categorySchema.virtual('fullPath').get(function() {
  // This would be populated with parent category names
  return this.categoryName;
});

// Pre-save middleware to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('categoryName') || this.isNew) {
    this.slug = this.categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Set meta fields if not provided
  if (!this.metaTitle) {
    this.metaTitle = this.categoryName;
  }
  
  if (!this.metaDescription) {
    this.metaDescription = this.categoryDescription || `Shop ${this.categoryName} at The Golden Rose`;
  }
  
  next();
});

// Post-save middleware to update product count
categorySchema.post('save', async function() {
  await this.updateProductCount();
});

// Static method to find active categories
categorySchema.statics.findActive = function() {
  return this.find({ 
    isActive: true, 
    isDeleted: false 
  }).sort({ displayOrder: 1, categoryName: 1 });
};

// Static method to find root categories (no parent)
categorySchema.statics.findRootCategories = function() {
  return this.find({ 
    parentCategory: null,
    isActive: true, 
    isDeleted: false 
  }).sort({ displayOrder: 1, categoryName: 1 });
};

// Static method to get category hierarchy
categorySchema.statics.getCategoryHierarchy = async function() {
  const categories = await this.find({ 
    isActive: true, 
    isDeleted: false 
  })
  .populate('subcategories')
  .sort({ displayOrder: 1, categoryName: 1 });

  const rootCategories = categories.filter(cat => !cat.parentCategory);
  
  const buildHierarchy = (parentId = null) => {
    return categories
      .filter(cat => {
        if (parentId === null) return !cat.parentCategory;
        return cat.parentCategory && cat.parentCategory.toString() === parentId.toString();
      })
      .map(cat => ({
        ...cat.toObject(),
        children: buildHierarchy(cat._id)
      }));
  };

  return buildHierarchy();
};

// Instance method to update product count
categorySchema.methods.updateProductCount = async function() {
  const Product = mongoose.model('Product');
  const count = await Product.countDocuments({ 
    category: this.categoryName,
    isDeleted: false,
    isAvailable: true
  });
  
  this.productCount = count;
  
  // Save without triggering middleware
  return this.constructor.findByIdAndUpdate(this._id, { productCount: count });
};

// Instance method to get products in category
categorySchema.methods.getProducts = function(options = {}) {
  const Product = mongoose.model('Product');
  const {
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = -1,
    minPrice,
    maxPrice,
    inStock = true
  } = options;

  let query = {
    category: this.categoryName,
    isDeleted: false,
    isAvailable: true
  };

  if (inStock) {
    query.stock = { $gt: 0 };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder;

  return Product.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('reviews', 'rating');
};

// Instance method to add subcategory
categorySchema.methods.addSubcategory = function(subcategoryId) {
  if (!this.subcategories.includes(subcategoryId)) {
    this.subcategories.push(subcategoryId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method to remove subcategory
categorySchema.methods.removeSubcategory = function(subcategoryId) {
  this.subcategories = this.subcategories.filter(
    id => id.toString() !== subcategoryId.toString()
  );
  return this.save();
};

// Instance method to add featured product
categorySchema.methods.addFeaturedProduct = function(productId) {
  if (!this.featuredProducts.includes(productId)) {
    this.featuredProducts.push(productId);
    
    // Keep only latest 6 featured products
    if (this.featuredProducts.length > 6) {
      this.featuredProducts = this.featuredProducts.slice(-6);
    }
    
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method to soft delete
categorySchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.isActive = false;
  return this.save();
};

// Instance method to restore
categorySchema.methods.restore = function() {
  this.isDeleted = false;
  this.deletedAt = undefined;
  this.isActive = true;
  return this.save();
};

module.exports = mongoose.model('Category', categorySchema);