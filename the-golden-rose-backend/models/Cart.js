const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
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
      min: [1, 'Quantity must be at least 1'],
      max: [99, 'Quantity cannot exceed 99']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    productImage: {
      type: String
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalPrice: {
    type: Number,
    default: 0,
    min: [0, 'Total price cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  deliveryFee: {
    type: Number,
    default: 2.99,
    min: [0, 'Delivery fee cannot be negative']
  },
  cartStatus: {
    type: String,
    enum: ['active', 'abandoned', 'checked_out'],
    default: 'active'
  },
  cartExpiryDate: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  },
  couponCode: {
    type: String,
    trim: true,
    uppercase: true
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
cartSchema.index({ userId: 1 });
cartSchema.index({ cartStatus: 1 });
cartSchema.index({ cartExpiryDate: 1 });
cartSchema.index({ lastActivity: 1 });

// Virtual for total items count
cartSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for subtotal (before tax and delivery)
cartSchema.virtual('subtotal').get(function() {
  return this.items.reduce((total, item) => total + item.subtotal, 0);
});

// Virtual for final total (including tax and delivery, minus discount)
cartSchema.virtual('finalTotal').get(function() {
  const subtotal = this.subtotal;
  const tax = Math.round(subtotal * 0.20 * 100) / 100; // 20% VAT
  const deliveryFee = subtotal >= 25 ? 0 : this.deliveryFee; // Free delivery over £25
  return subtotal + tax + deliveryFee - this.discount;
});

// Virtual for delivery eligibility
cartSchema.virtual('isFreeDeliveryEligible').get(function() {
  return this.subtotal >= 25;
});

// Virtual for amount needed for free delivery
cartSchema.virtual('amountForFreeDelivery').get(function() {
  const needed = 25 - this.subtotal;
  return needed > 0 ? Math.round(needed * 100) / 100 : 0;
});

// Pre-save middleware to calculate totals
cartSchema.pre('save', function(next) {
  // Update last activity
  this.lastActivity = new Date();
  
  // Calculate subtotals for each item
  this.items.forEach(item => {
    item.subtotal = Math.round(item.price * item.quantity * 100) / 100;
  });
  
  // Calculate total price (subtotal)
  this.totalPrice = this.items.reduce((total, item) => total + item.subtotal, 0);
  
  // Calculate tax (20% VAT)
  this.tax = Math.round(this.totalPrice * 0.20 * 100) / 100;
  
  // Calculate delivery fee (free over £25)
  this.deliveryFee = this.totalPrice >= 25 ? 0 : 2.99;
  
  next();
});

// Static method to find active cart by user
cartSchema.statics.findActiveByUser = function(userId) {
  return this.findOne({ 
    userId, 
    cartStatus: 'active',
    cartExpiryDate: { $gt: new Date() }
  }).populate('items.productId', 'productName price productImage stock isAvailable');
};

// Static method to find or create cart
cartSchema.statics.findOrCreateCart = async function(userId) {
  let cart = await this.findActiveByUser(userId);
  
  if (!cart) {
    cart = new this({ userId });
    await cart.save();
  }
  
  return cart;
};

// Static method to cleanup expired carts
cartSchema.statics.cleanupExpiredCarts = function() {
  return this.updateMany(
    { 
      cartExpiryDate: { $lt: new Date() },
      cartStatus: 'active'
    },
    { 
      cartStatus: 'abandoned' 
    }
  );
};

// Instance method to add item to cart
cartSchema.methods.addItem = async function(productId, quantity = 1) {
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (!product.isAvailable || product.stock < quantity) {
    throw new Error('Product is not available or insufficient stock');
  }
  
  // Check if item already exists in cart
  const existingItemIndex = this.items.findIndex(
    item => item.productId.toString() === productId.toString()
  );
  
  if (existingItemIndex > -1) {
    // Update existing item
    const newQuantity = this.items[existingItemIndex].quantity + quantity;
    
    if (newQuantity > product.stock) {
      throw new Error('Requested quantity exceeds available stock');
    }
    
    if (newQuantity > 99) {
      throw new Error('Maximum quantity per item is 99');
    }
    
    this.items[existingItemIndex].quantity = newQuantity;
    this.items[existingItemIndex].price = product.price; // Update price in case it changed
  } else {
    // Add new item
    this.items.push({
      productId: product._id,
      productName: product.productName,
      quantity,
      price: product.price,
      productImage: product.productImage[0]?.url || '',
      subtotal: product.price * quantity
    });
  }
  
  return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
  if (quantity < 1) {
    return this.removeItem(productId);
  }
  
  const Product = mongoose.model('Product');
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  if (quantity > product.stock) {
    throw new Error('Requested quantity exceeds available stock');
  }
  
  if (quantity > 99) {
    throw new Error('Maximum quantity per item is 99');
  }
  
  const itemIndex = this.items.findIndex(
    item => item.productId.toString() === productId.toString()
  );
  
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }
  
  this.items[itemIndex].quantity = quantity;
  this.items[itemIndex].price = product.price; // Update price in case it changed
  
  return this.save();
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(
    item => item.productId.toString() !== productId.toString()
  );
  
  return this.save();
};

// Instance method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.couponCode = undefined;
  this.discount = 0;
  
  return this.save();
};

// Instance method to apply coupon
cartSchema.methods.applyCoupon = async function(couponCode) {
  // This would integrate with a coupon system
  // For now, we'll implement basic logic
  
  const validCoupons = {
    'WELCOME10': { type: 'percentage', value: 10, minOrder: 20 },
    'SAVE5': { type: 'fixed', value: 5, minOrder: 15 },
    'FREESHIP': { type: 'free_shipping', value: 0, minOrder: 10 }
  };
  
  const coupon = validCoupons[couponCode.toUpperCase()];
  
  if (!coupon) {
    throw new Error('Invalid coupon code');
  }
  
  if (this.subtotal < coupon.minOrder) {
    throw new Error(`Minimum order of £${coupon.minOrder} required for this coupon`);
  }
  
  this.couponCode = couponCode.toUpperCase();
  
  switch (coupon.type) {
    case 'percentage':
      this.discount = Math.round(this.subtotal * (coupon.value / 100) * 100) / 100;
      break;
    case 'fixed':
      this.discount = Math.min(coupon.value, this.subtotal);
      break;
    case 'free_shipping':
      this.deliveryFee = 0;
      this.discount = 0;
      break;
  }
  
  return this.save();
};

// Instance method to remove coupon
cartSchema.methods.removeCoupon = function() {
  this.couponCode = undefined;
  this.discount = 0;
  // Reset delivery fee calculation
  this.deliveryFee = this.subtotal >= 25 ? 0 : 2.99;
  
  return this.save();
};

// Instance method to validate cart items
cartSchema.methods.validateItems = async function() {
  const Product = mongoose.model('Product');
  const errors = [];
  
  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];
    const product = await Product.findById(item.productId);
    
    if (!product) {
      errors.push(`Product "${item.productName}" is no longer available`);
      continue;
    }
    
    if (!product.isAvailable) {
      errors.push(`Product "${product.productName}" is currently unavailable`);
      continue;
    }
    
    if (product.stock < item.quantity) {
      errors.push(`Only ${product.stock} units of "${product.productName}" are available`);
      continue;
    }
    
    // Update price if it has changed
    if (item.price !== product.price) {
      item.price = product.price;
      errors.push(`Price of "${product.productName}" has been updated`);
    }
  }
  
  if (errors.length === 0) {
    await this.save();
  }
  
  return errors;
};

// Instance method to convert to order format
cartSchema.methods.toOrderFormat = function() {
  return {
    items: this.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      pricePerItem: item.price,
      subtotal: item.subtotal,
      productImage: item.productImage
    })),
    subtotal: this.subtotal,
    tax: this.tax,
    deliveryFee: this.deliveryFee,
    discount: this.discount,
    totalAmount: this.subtotal + this.tax,
    finalAmount: this.finalTotal
  };
};

// Instance method to mark as checked out
cartSchema.methods.markAsCheckedOut = function() {
  this.cartStatus = 'checked_out';
  return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);