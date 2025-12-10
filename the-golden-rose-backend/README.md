# The Golden Rose Backend API

A complete MERN stack e-commerce backend for The Golden Rose takeaway and convenience store.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Email verification
- Password reset functionality
- Role-based access control (user/admin)
- OAuth integration ready (Google, Facebook)

### E-commerce Functionality
- Product management with categories
- Shopping cart with coupon support
- Order management with status tracking
- Payment processing (Stripe integration)
- Review and rating system
- Inventory management

### Admin Dashboard
- User management
- Product management
- Order tracking and fulfillment
- Sales analytics and reporting
- System health monitoring
- Admin action logging

### Additional Features
- Email notifications (order confirmations, status updates)
- Image upload with Cloudinary
- Comprehensive error handling
- Request rate limiting
- Security middleware
- Detailed logging system

## 📋 Prerequisites

- Node.js 16+ 
- MongoDB database
- Stripe account (for payments)
- Cloudinary account (for image uploads)
- Email service (Gmail or SMTP)

## 🛠️ Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd the-golden-rose-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Environment Variables section)

5. **Test setup**
   ```bash
   node test-setup.js
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/golden-rose
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/golden-rose

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FROM_NAME=The Golden Rose
FROM_EMAIL=noreply@thegoldenrose.com

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Business Information
BUSINESS_NAME=The Golden Rose
ADMIN_EMAIL=admin@thegoldenrose.com
SUPPORT_EMAIL=support@thegoldenrose.com
SUPPORT_PHONE=+447396890670

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### Optional Variables
```env
# OAuth (if implementing)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# PayPal (if implementing)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Authentication Endpoints
```
POST   /auth/register          - Register new user
POST   /auth/login             - Login user
GET    /auth/logout            - Logout user
GET    /auth/me                - Get current user
PUT    /auth/updatedetails     - Update user details
PUT    /auth/updatepassword    - Update password
POST   /auth/forgotpassword    - Request password reset
PUT    /auth/resetpassword/:token - Reset password
GET    /auth/verify-email/:token - Verify email
```

### Product Endpoints
```
GET    /products               - Get all products
GET    /products/:id           - Get single product
GET    /products/search        - Search products
GET    /products/featured      - Get featured products
GET    /products/category/:id  - Get products by category
POST   /products               - Create product (Admin)
PUT    /products/:id           - Update product (Admin)
DELETE /products/:id           - Delete product (Admin)
```

### Cart Endpoints
```
GET    /cart                   - Get user cart
POST   /cart/add               - Add item to cart
PUT    /cart/update            - Update cart item
DELETE /cart/remove/:productId - Remove item from cart
DELETE /cart/clear             - Clear cart
POST   /cart/coupon            - Apply coupon
DELETE /cart/coupon            - Remove coupon
```

### Order Endpoints
```
POST   /orders                 - Create new order
GET    /orders/myorders        - Get user orders
GET    /orders/:id             - Get order by ID
PUT    /orders/:id/pay         - Update order to paid
PUT    /orders/:id/cancel      - Cancel order
POST   /orders/:id/create-payment-intent - Create Stripe payment intent
```

### Category Endpoints
```
GET    /categories             - Get all categories
GET    /categories/:id         - Get single category
GET    /categories/tree        - Get category tree
GET    /categories/:id/products - Get category products
POST   /categories             - Create category (Admin)
PUT    /categories/:id         - Update category (Admin)
DELETE /categories/:id         - Delete category (Admin)
```

### Admin Endpoints
```
GET    /admin/dashboard        - Get dashboard stats
GET    /admin/users            - Get all users
GET    /admin/users/:id        - Get single user
PUT    /admin/users/:id        - Update user
DELETE /admin/users/:id        - Delete user
GET    /admin/logs             - Get admin logs
GET    /admin/health           - Get system health
PUT    /admin/products/bulk    - Bulk update products
GET    /admin/export/:type     - Export data
```

## 🗄️ Database Models

### User Model
- Authentication (email, password, JWT tokens)
- Profile information (name, phone, addresses)
- Role-based permissions
- OAuth provider data
- Email verification status

### Product Model
- Basic info (name, description, price)
- Images and media
- Category and tags
- Stock management
- SEO fields
- Reviews and ratings

### Order Model
- Customer information
- Order items with quantities
- Shipping address
- Payment information
- Order status tracking
- Timestamps

### Cart Model
- User association
- Cart items with quantities
- Coupon application
- Price calculations
- Auto-cleanup

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - Prevent abuse
- **CORS** - Cross-origin protection
- **JWT Authentication** - Secure tokens
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Mongoose validators
- **Error Handling** - No sensitive data exposure

## 📧 Email System

The backend includes a comprehensive email system with:

- **Order Confirmations** - Customer and admin notifications
- **Payment Confirmations** - Successful payment alerts
- **Status Updates** - Order progress notifications
- **Password Reset** - Secure reset links
- **Email Verification** - Account verification

Email templates are responsive and branded for The Golden Rose.

## 💳 Payment Integration

### Stripe Integration
- Payment intents for secure processing
- Webhook handling for payment events
- Automatic order status updates
- Refund processing support

### Webhook Events Handled
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.dispute.created`

## 📊 Logging System

Comprehensive logging with Winston:
- **General Logs** - Application events
- **Auth Logs** - Authentication events
- **Payment Logs** - Payment processing
- **Admin Logs** - Administrative actions
- **Error Logs** - Error tracking

## 🚀 Deployment

### Railway Deployment
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Render Deployment
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Environment-specific Configuration
- **Development** - Local MongoDB, Ethereal email
- **Production** - MongoDB Atlas, Gmail SMTP

## 🧪 Testing

### Manual Testing
```bash
# Test setup
node test-setup.js

# Test with curl
curl http://localhost:5000/api/health
```

### Postman Collection
Import the provided Postman collection for comprehensive API testing.

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run test       # Run tests (when implemented)
npm run setup      # Run setup test script
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MONGODB_URI in .env
   - Ensure MongoDB is running
   - Check network connectivity

2. **Email Not Sending**
   - Verify EMAIL_USER and EMAIL_PASSWORD
   - Enable 2FA and use App Password for Gmail
   - Check spam folder

3. **Stripe Webhook Issues**
   - Verify STRIPE_WEBHOOK_SECRET
   - Check webhook endpoint URL
   - Test with Stripe CLI

4. **Image Upload Failing**
   - Verify Cloudinary credentials
   - Check image size limits
   - Ensure proper file format

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and logging.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@thegoldenrose.com or call +44 7396 890670.

---

**The Golden Rose Backend API** - Built with ❤️ for the Newhaven community.