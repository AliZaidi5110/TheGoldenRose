# Update Your GitHub Repository

## Push Updated Code to: https://github.com/AliZaidi5110/TheGoldenRose

Follow these steps to update your existing repository with the new code:

## Step 1: Initialize Git (if needed)

```bash
git init
```

## Step 2: Connect to Your Existing Repository

```bash
git remote add origin https://github.com/AliZaidi5110/TheGoldenRose.git
```

If you get an error saying "remote origin already exists", remove it first:
```bash
git remote remove origin
git remote add origin https://github.com/AliZaidi5110/TheGoldenRose.git
```

## Step 3: Add All Your New Files

```bash
git add .
```

## Step 4: Commit Your Changes

```bash
git commit -m "Complete website redesign with purple theme and new features"
```

## Step 5: Push to GitHub

```bash
git branch -M main
git push -f origin main
```

**Note:** The `-f` flag forces the push, which will replace the old code with your new code.

---

## Alternative: Step-by-Step Commands (Copy & Paste)

Open your terminal in the project folder and run these commands one by one:

```bash
git init
git remote remove origin
git remote add origin https://github.com/AliZaidi5110/TheGoldenRose.git
git add .
git commit -m "Complete website redesign - Purple theme, new menu system, improved UI"
git branch -M main
git push -f origin main
```

---

## After Pushing to GitHub

### Deploy to Vercel:

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. If you already have this project on Vercel:
   - It will automatically redeploy with the new code
   - Wait 2-3 minutes for the build

4. If this is a new deployment:
   - Click "Add New..." → "Project"
   - Select "TheGoldenRose" repository
   - Framework: **Vite**
   - Click "Deploy"

---

## Verify Your Deployment

After pushing, check:
- GitHub: https://github.com/AliZaidi5110/TheGoldenRose
- Vercel: Your live site URL

---

## What's New in This Update?

✅ Dark Purple (#301934) & White Theme
✅ Greggs-Style Menu System
✅ Clean Product Display (No Boxes)
✅ Professional Modal Popups
✅ Shopping Cart Functionality
✅ Checkout Page
✅ Improved Contact Page with Maps
✅ Modern Footer with Social Media
✅ Scroll to Top on Navigation
✅ Responsive Design (100% Zoom Optimized)
✅ Restaurant Image Gallery
✅ All Images Updated (AVIF, WebP, PNG)

---

## Need Help?

If you encounter any issues:

1. **Authentication Error:**
   - GitHub may ask for credentials
   - Use Personal Access Token instead of password
   - Generate at: https://github.com/settings/tokens

2. **Permission Denied:**
   - Make sure you're logged into the correct GitHub account
   - Check repository permissions

3. **Merge Conflicts:**
   - Use force push: `git push -f origin main`
   - This replaces old code with new code

---

**Ready to deploy! 🚀**
