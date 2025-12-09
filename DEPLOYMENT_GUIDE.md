# Deployment Guide - The Golden Rose

## Step 1: Deploy to GitHub

### Option A: Using Git Commands (Recommended)

1. **Initialize Git (if not already done):**
```bash
git init
```

2. **Add all files:**
```bash
git add .
```

3. **Commit your changes:**
```bash
git commit -m "Complete website with purple theme - The Golden Rose"
```

4. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `the-golden-rose`
   - Description: "The Golden Rose - Local Fresh & Everyday Essentials"
   - Keep it Public
   - Don't initialize with README (you already have one)
   - Click "Create repository"

5. **Connect to GitHub and push:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/the-golden-rose.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Option B: Using GitHub Desktop

1. Open GitHub Desktop
2. Click "Add" → "Add Existing Repository"
3. Select your project folder
4. Click "Publish repository"
5. Name it "the-golden-rose"
6. Click "Publish Repository"

---

## Step 2: Deploy to Vercel

### Method 1: Using Vercel Website (Easiest)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find "the-golden-rose" repository
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your site will be live at: `https://the-golden-rose.vercel.app`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `the-golden-rose`
   - Directory? `./`
   - Override settings? **N**

5. **Deploy to Production:**
```bash
vercel --prod
```

---

## Step 3: Configure Custom Domain (Optional)

1. In Vercel Dashboard:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

---

## Important Files for Deployment

### package.json (Already configured)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### vite.config.js (Already configured)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## Troubleshooting

### Issue: Build fails on Vercel
**Solution:** Make sure all dependencies are in package.json
```bash
npm install
npm run build
```
Test locally first before deploying.

### Issue: Images not loading
**Solution:** Images in `/assets` folder are correctly imported. Vercel will handle them automatically.

### Issue: Routes not working (404 on refresh)
**Solution:** Add `vercel.json` file:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Video not loading
**Solution:** Make sure video file is in `/public/assets/` folder or update the path in About.jsx

---

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages work (Home, Menu, Products, About, Contact)
- [ ] Images display properly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Forms work
- [ ] Links work (phone, email, WhatsApp)
- [ ] Google Maps loads on Contact page

---

## Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- **Every push to main branch** → Production deployment
- **Every pull request** → Preview deployment

---

## Your Live URLs

After deployment, you'll get:
- **Production:** `https://the-golden-rose.vercel.app`
- **Preview:** `https://the-golden-rose-git-branch.vercel.app`

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Vite Docs: https://vitejs.dev/guide/

---

## Quick Commands Reference

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Deploy to Vercel
vercel --prod

# Check Git status
git status

# Push to GitHub
git add .
git commit -m "Update message"
git push
```

---

**Your website is ready to go live! 🚀**
