# 🚀 Quick Deployment Guide

## Railway Deployment (Recommended)

### 1. Prerequisites
- GitHub account
- Railway account (free)
- MongoDB Atlas account (free)

### 2. Setup MongoDB Atlas
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account and cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string

### 3. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy

### 4. Set Environment Variables
In Railway dashboard, add these variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/golden-rose
JWT_SECRET=your-super-secret-jwt-key-here-32-chars-min
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FROM_NAME=The Golden Rose
FROM_EMAIL=noreply@thegoldenrose.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
BUSINESS_NAME=The Golden Rose
ADMIN_EMAIL=admin@thegoldenrose.com
SUPPORT_EMAIL=support@thegoldenrose.com
SUPPORT_PHONE=+447396890670
FRONTEND_URL=https://the-golden-rose.vercel.app
```

### 5. Test Deployment
- Railway will provide a URL like: `https://golden-rose-backend-production.up.railway.app`
- Test: `https://your-url.railway.app/api/health`

## Alternative: Render Deployment

1. Go to [render.com](https://render.com)
2. Connect GitHub repository
3. Choose "Web Service"
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add same environment variables as above

## Post-Deployment Steps

1. **Test API endpoints**
2. **Update frontend API_URL**
3. **Configure Stripe webhooks**
4. **Test payment flow**
5. **Monitor logs for errors**

## Quick Commands

```bash
# Test health endpoint
curl https://your-api-url.railway.app/api/health

# Test products endpoint
curl https://your-api-url.railway.app/api/products

# Check logs (Railway CLI)
railway logs
```