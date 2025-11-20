# Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your Git repository

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
npm run build
vercel --prod
```

Or connect your Git repository at [vercel.com](https://vercel.com)

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
})
```

4. **Deploy**
```bash
npm run deploy
```

### Option 4: Traditional Hosting (cPanel, etc.)

1. **Build the project**
```bash
npm run build
```

2. **Upload files**
   - Upload all files from the `dist` folder
   - Upload to your web hosting via FTP/SFTP
   - Point your domain to the uploaded files

---

## 🔧 Pre-Deployment Checklist

### 1. Update Contact Information
- [ ] Email address in Footer and Contact page
- [ ] Phone number in Footer and Contact page
- [ ] Business address
- [ ] Social media links
- [ ] Google Maps embed URL

### 2. Update Business Details
- [ ] Opening hours
- [ ] Delivery areas
- [ ] Minimum order amount
- [ ] Delivery time

### 3. Optimize Images
- [ ] Compress product images (use TinyPNG or similar)
- [ ] Ensure logo is optimized
- [ ] Check all images load correctly

### 4. Test Functionality
- [ ] All navigation links work
- [ ] Contact form validation works
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Mobile menu works
- [ ] All buttons are clickable

### 5. SEO Optimization
- [ ] Update page title in `index.html`
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Add favicon
- [ ] Create sitemap.xml
- [ ] Create robots.txt

### 6. Performance
- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Optimize bundle size
- [ ] Enable compression

---

## 📝 Environment Variables

If you need to add environment variables:

1. **Create `.env` file**
```env
VITE_API_URL=https://your-api.com
VITE_GOOGLE_MAPS_KEY=your-key-here
```

2. **Use in code**
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

3. **Add to deployment platform**
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables

---

## 🔒 Security Considerations

### Before Deployment
- [ ] Remove any test/dummy data
- [ ] Secure API keys (use environment variables)
- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Implement rate limiting for forms

### Recommended Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 Analytics Setup

### Google Analytics

1. **Get tracking ID** from Google Analytics

2. **Add to `index.html`** (before closing `</head>`)
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 Post-Deployment

### 1. Test Everything
- [ ] Test on multiple devices
- [ ] Test on different browsers
- [ ] Test all forms
- [ ] Test all links
- [ ] Check mobile responsiveness

### 2. Monitor Performance
- [ ] Set up uptime monitoring
- [ ] Monitor page load times
- [ ] Check error logs
- [ ] Monitor form submissions

### 3. SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google My Business
- [ ] Add structured data

### 4. Marketing
- [ ] Update social media links
- [ ] Share on Facebook page
- [ ] Add to local directories
- [ ] Set up email marketing

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📱 Domain Setup

### Custom Domain

1. **Purchase domain** (GoDaddy, Namecheap, etc.)

2. **Configure DNS**
   - For Netlify: Add CNAME record
   - For Vercel: Add A and CNAME records
   - For GitHub Pages: Add CNAME file

3. **Enable HTTPS**
   - Most platforms provide free SSL
   - Enable automatic HTTPS redirect

---

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (16+)
- Clear node_modules and reinstall
- Check for syntax errors

### Images Not Loading
- Check image paths
- Ensure images are in assets folder
- Check file extensions match

### Routing Issues (404 on refresh)
- Add `_redirects` file for Netlify:
  ```
  /*    /index.html   200
  ```
- Add `vercel.json` for Vercel:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
  }
  ```

### Slow Loading
- Optimize images
- Enable compression
- Use CDN
- Lazy load images

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first
- Contact hosting support

---

## ✅ Deployment Complete!

Once deployed, your website will be live and ready to take orders!

Remember to:
- Monitor performance
- Update content regularly
- Respond to customer inquiries
- Keep products and prices current
