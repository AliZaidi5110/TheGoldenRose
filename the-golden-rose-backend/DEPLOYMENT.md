# Deployment Guide - The Golden Rose Backend

This guide covers deploying the backend API to various cloud platforms.

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended)
Railway offers the easiest deployment with automatic GitHub integration.

### Option 2: Render
Free tier available with good performance for small applications.

### Option 3: Heroku
Popular platform with extensive add-on ecosystem.

---

## 🚂 Railway Deployment

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Ensure all files are committed
3. Verify .env.example is included (not .env)

### Step 2: Railway Setup
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### Step 3: Environment Variables
Add these environment variables in Railway dashboard:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/golden-rose
JWT_SECRET=your-super-secret-jwt-key-production
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FROM_NAME=The Golden Rose
FROM_EMAIL=noreply@thegoldenrose.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
BUSINESS_NAME=The Golden Rose
ADMIN_EMAIL=admin@thegoldenrose.com
SUPPORT_EMAIL=support@thegoldenrose.com
SUPPORT_PHONE=+447396890670
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Step 4: Deploy
1. Railway will automatically deploy
2. Get your deployment URL
3. Test the API endpoints

---

## 🎨 Render Deployment

### Step 1: Prepare Repository
Same as Railway preparation steps.

### Step 2: Render Setup
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### Step 3: Configuration
```yaml
# Build Command
npm install

# Start Command
npm start

# Environment
Node

# Auto-Deploy
Yes
```

### Step 4: Environment Variables
Add the same environment variables as Railway.

### Step 5: Deploy
Render will build and deploy automatically.

---

## 🟣 Heroku Deployment

### Step 1: Install Heroku CLI
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login
```

### Step 2: Create Heroku App
```bash
# Create new app
heroku create golden-rose-backend

# Add MongoDB addon (optional)
heroku addons:create mongolab:sandbox
```

### Step 3: Configure Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-jwt-key
heroku config:set STRIPE_SECRET_KEY=sk_live_your_stripe_key
# ... add all other environment variables
```

### Step 4: Deploy
```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/golden-rose-backend.git

# Deploy
git push heroku main
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Add to MONGODB_URI environment variable

### Local MongoDB (Development)
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Windows
# Download from mongodb.com

# Start MongoDB
mongod
```

---

## 💳 Payment Setup

### Stripe Configuration
1. Go to [stripe.com](https://stripe.com)
2. Create account
3. Get API keys from dashboard
4. Set up webhooks:
   - Endpoint: `https://your-api-domain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Add webhook secret to environment variables

### Test vs Live Keys
- **Development**: Use test keys (sk_test_...)
- **Production**: Use live keys (sk_live_...)

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → App passwords
   - Select "Mail" and generate password
3. Use generated password in EMAIL_PASSWORD

### Alternative Email Services
- **SendGrid**: Professional email service
- **Mailgun**: Developer-friendly email API
- **AWS SES**: Amazon's email service

---

## 🖼️ Image Upload Setup

### Cloudinary Configuration
1. Go to [cloudinary.com](https://cloudinary.com)
2. Create free account
3. Get credentials from dashboard:
   - Cloud name
   - API key
   - API secret
4. Add to environment variables

### Alternative Image Services
- **AWS S3**: Amazon's storage service
- **Google Cloud Storage**: Google's storage solution
- **Azure Blob Storage**: Microsoft's storage service

---

## 🔒 Security Checklist

### Before Production Deployment
- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Environment Variables Security
```env
# ❌ Never commit these to Git
JWT_SECRET=production-secret-key
STRIPE_SECRET_KEY=sk_live_...
EMAIL_PASSWORD=app-password
MONGODB_URI=mongodb+srv://...

# ✅ Use strong, unique values
JWT_SECRET=aB3$kL9#mN2@pQ7&rS5!tU8*vW1^xY4%
```

---

## 📊 Monitoring & Logging

### Application Monitoring
- **Railway**: Built-in monitoring
- **Render**: Basic metrics included
- **Heroku**: Heroku Metrics addon

### External Monitoring
- **New Relic**: Application performance monitoring
- **DataDog**: Infrastructure and application monitoring
- **Sentry**: Error tracking and performance monitoring

### Log Management
- **LogDNA**: Log aggregation and analysis
- **Papertrail**: Simple log management
- **Splunk**: Enterprise log analysis

---

## 🧪 Testing Production Deployment

### Health Check
```bash
curl https://your-api-domain.com/api/health
```

### API Endpoints Test
```bash
# Test authentication
curl -X POST https://your-api-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test products
curl https://your-api-domain.com/api/products
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Create test script
artillery quick --count 10 --num 5 https://your-api-domain.com/api/health
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Recommended)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm ci
    - run: npm test
    - name: Deploy to Railway
      uses: railway-app/railway-deploy@v1
      with:
        railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

### Automatic Deployment
- **Railway**: Auto-deploys on Git push
- **Render**: Auto-deploys on Git push
- **Heroku**: Manual or automatic deployment

---

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check Node.js version compatibility
   # Ensure all dependencies are in package.json
   # Verify build scripts
   ```

2. **Environment Variable Issues**
   ```bash
   # Double-check all required variables are set
   # Verify no typos in variable names
   # Check for special characters that need escaping
   ```

3. **Database Connection Issues**
   ```bash
   # Verify MongoDB URI format
   # Check IP whitelist settings
   # Ensure database user has proper permissions
   ```

4. **CORS Issues**
   ```bash
   # Add frontend domain to CORS whitelist
   # Check protocol (http vs https)
   # Verify port numbers
   ```

### Debug Commands
```bash
# Check deployment logs
railway logs
# or
heroku logs --tail

# Test database connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"

# Test environment variables
node -e "console.log(process.env.JWT_SECRET ? 'JWT_SECRET is set' : 'JWT_SECRET missing')"
```

---

## 📈 Performance Optimization

### Production Optimizations
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries
- Use connection pooling
- Enable HTTP/2

### Scaling Strategies
- **Horizontal Scaling**: Multiple server instances
- **Vertical Scaling**: Increase server resources
- **Database Scaling**: Read replicas, sharding
- **Caching**: Redis, Memcached
- **Load Balancing**: Distribute traffic

---

## 💰 Cost Optimization

### Free Tier Limits
- **Railway**: $5/month credit
- **Render**: 750 hours/month free
- **Heroku**: 550-1000 dyno hours/month
- **MongoDB Atlas**: 512MB free cluster

### Cost-Effective Strategies
- Use free tiers for development
- Monitor usage and costs
- Optimize resource usage
- Use spot instances when available
- Implement auto-scaling

---

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review deployment logs
3. Test locally first
4. Contact platform support
5. Community forums and Stack Overflow

---

**Happy Deploying! 🚀**