# 🚂 Deploy to Railway - Step by Step

## 1. Prepare for Deployment

### Check your code is ready:
```bash
# Test the setup
node test-setup.js

# Make sure all files are committed
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

## 2. Create MongoDB Atlas Database

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)
4. Create database user:
   - Username: `goldenrose`
   - Password: Generate strong password
5. Network Access: Add IP `0.0.0.0/0` (allow all)
6. Get connection string:
   ```
   mongodb+srv://goldenrose:<password>@cluster0.xxxxx.mongodb.net/golden-rose
   ```

## 3. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository: `the-golden-rose-backend`
6. Railway will automatically detect Node.js and start building

## 4. Configure Environment Variables

In Railway dashboard, go to Variables tab and add:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://goldenrose:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/golden-rose
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_test_51xxxxx (get from Stripe dashboard)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx (will set up later)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FROM_NAME=The Golden Rose
FROM_EMAIL=noreply@thegoldenrose.com
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
BUSINESS_NAME=The Golden Rose
ADMIN_EMAIL=admin@thegoldenrose.com
SUPPORT_EMAIL=support@thegoldenrose.com
SUPPORT_PHONE=+447396890670
FRONTEND_URL=https://the-golden-rose.vercel.app
```

## 5. Test Your Deployment

Railway will give you a URL like: `https://golden-rose-backend-production.up.railway.app`

Test these endpoints:
```bash
# Health check
curl https://your-railway-url.railway.app/api/health

# Products (should return empty array initially)
curl https://your-railway-url.railway.app/api/products

# Categories
curl https://your-railway-url.railway.app/api/categories
```

## 6. Set up Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-railway-url.railway.app/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`
4. Copy webhook secret and add to Railway environment variables as `STRIPE_WEBHOOK_SECRET`

## 7. Create Admin User

Use a tool like Postman or curl to create the first admin user:

```bash
curl -X POST https://your-railway-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@thegoldenrose.com",
    "password": "SecurePassword123!",
    "phone": "+447396890670"
  }'
```

Then manually update the user role to 'admin' in MongoDB Atlas.

## 8. Update Frontend

Update your frontend's API URL to point to your Railway deployment:
```javascript
const API_URL = 'https://your-railway-url.railway.app/api';
```

## 9. Final Testing

Test the complete flow:
1. User registration/login
2. Product creation (admin)
3. Add to cart
4. Create order
5. Payment processing
6. Email notifications

## 🎉 You're Live!

Your backend is now deployed and ready to serve your frontend application!

**Important URLs:**
- API Base: `https://your-railway-url.railway.app/api`
- Health Check: `https://your-railway-url.railway.app/api/health`
- Admin Dashboard: Connect your frontend admin panel to these endpoints

## Monitoring

- Railway provides built-in monitoring
- Check logs in Railway dashboard
- Set up error tracking (Sentry recommended)
- Monitor performance and usage