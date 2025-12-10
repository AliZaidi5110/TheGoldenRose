// Simple test script to verify backend setup
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing Backend Setup...\n');

// Test 1: Environment Variables
console.log('1. Environment Variables:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('   PORT:', process.env.PORT || 'not set');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('   STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Not set');
console.log('   EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('   CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not set');

// Test 2: Model Imports
console.log('\n2. Model Imports:');
try {
  const User = require('./models/User');
  const Product = require('./models/Product');
  const Order = require('./models/Order');
  const Cart = require('./models/Cart');
  console.log('   ✅ All models imported successfully');
} catch (error) {
  console.log('   ❌ Model import error:', error.message);
}

// Test 3: Controller Imports
console.log('\n3. Controller Imports:');
try {
  const authController = require('./controllers/authController');
  const productController = require('./controllers/productController');
  const orderController = require('./controllers/orderController');
  const cartController = require('./controllers/cartController');
  console.log('   ✅ All controllers imported successfully');
} catch (error) {
  console.log('   ❌ Controller import error:', error.message);
}

// Test 4: Route Imports
console.log('\n4. Route Imports:');
try {
  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const orderRoutes = require('./routes/orders');
  const cartRoutes = require('./routes/cart');
  console.log('   ✅ All routes imported successfully');
} catch (error) {
  console.log('   ❌ Route import error:', error.message);
}

// Test 5: Database Connection (if MongoDB URI is provided)
if (process.env.MONGODB_URI) {
  console.log('\n5. Database Connection Test:');
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('   ✅ MongoDB connected successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('   ❌ MongoDB connection error:', error.message);
  });
} else {
  console.log('\n5. Database Connection Test: Skipped (no MONGODB_URI)');
}

console.log('\n🎉 Backend setup test completed!');
console.log('\nNext steps:');
console.log('1. Create .env file with all required environment variables');
console.log('2. Run: npm install');
console.log('3. Run: npm start');
console.log('4. Test API endpoints with Postman or curl');