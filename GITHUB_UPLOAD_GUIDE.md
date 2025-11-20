# 📤 GitHub Upload Guide

## Step-by-Step Instructions to Upload The Golden Rose to GitHub

### Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**
   - Go to https://desktop.github.com/
   - Download and install

2. **Create a New Repository**
   - Open GitHub Desktop
   - Click "File" → "New Repository"
   - Name: `the-golden-rose`
   - Description: "Modern takeaway website for The Golden Rose"
   - Local Path: Choose your project folder
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository" button
   - Uncheck "Keep this code private" (or keep checked if you want it private)
   - Click "Publish Repository"

4. **Done!** Your code is now on GitHub

---

### Option 2: Using Command Line (Git)

#### First Time Setup

1. **Install Git**
   ```bash
   # Download from: https://git-scm.com/downloads
   ```

2. **Configure Git** (if not done already)
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

#### Upload Steps

1. **Open Terminal/Command Prompt** in your project folder

2. **Initialize Git Repository**
   ```bash
   git init
   ```

3. **Add All Files**
   ```bash
   git add .
   ```

4. **Create First Commit**
   ```bash
   git commit -m "Initial commit: The Golden Rose website"
   ```

5. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `the-golden-rose`
   - Description: "Modern takeaway website for The Golden Rose"
   - Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

6. **Link Local to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/the-golden-rose.git
   ```
   Replace `YOUR_USERNAME` with your GitHub username

7. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

8. **Done!** Visit `https://github.com/YOUR_USERNAME/the-golden-rose`

---

### Option 3: Using VS Code (If you use VS Code)

1. **Open Project in VS Code**

2. **Initialize Repository**
   - Click Source Control icon (left sidebar)
   - Click "Initialize Repository"

3. **Stage All Changes**
   - Click "+" next to "Changes" to stage all files

4. **Commit**
   - Type commit message: "Initial commit: The Golden Rose website"
   - Click checkmark ✓

5. **Publish to GitHub**
   - Click "Publish to GitHub" button
   - Choose repository name: `the-golden-rose`
   - Choose Public or Private
   - Click "Publish"

6. **Done!**

---

## 📝 Before Uploading - Checklist

✅ **Files to Include:**
- All source code (`src/` folder)
- Assets (`assets/` folder)
- Configuration files (`package.json`, `vite.config.js`, etc.)
- `.gitignore` file
- `README.md` or `README_GITHUB.md`

✅ **Files to Exclude (already in .gitignore):**
- `node_modules/` folder (too large, can be reinstalled)
- `dist/` folder (build output)
- `.env` files (if any)
- Log files

✅ **Optional - Rename README:**
```bash
# If you want to use the GitHub-specific README
mv README_GITHUB.md README.md
```

---

## 🔒 Important Notes

### Private vs Public Repository

**Public Repository:**
- ✅ Free
- ✅ Anyone can see the code
- ✅ Good for portfolio
- ❌ Code is visible to everyone

**Private Repository:**
- ✅ Code is hidden
- ✅ Only you can see it
- ✅ Can invite collaborators
- ✅ Free on GitHub

**Recommendation:** Start with **Private** if you're unsure. You can make it public later.

### Sensitive Information

⚠️ **Before uploading, make sure:**
- No passwords in the code
- No API keys exposed
- No personal information
- Contact info is intentional (it's in the website anyway)

---

## 🚀 After Upload - Next Steps

### 1. Add Repository Description
- Go to your repository on GitHub
- Click "⚙️ Settings"
- Add description: "Modern React + Tailwind CSS website for The Golden Rose takeaway"
- Add topics: `react`, `tailwindcss`, `vite`, `restaurant`, `website`

### 2. Enable GitHub Pages (Optional - for free hosting)
- Go to Settings → Pages
- Source: Deploy from branch
- Branch: `main` → `/dist` or `/root`
- Click Save
- Your site will be live at: `https://yourusername.github.io/the-golden-rose/`

### 3. Add a License (Optional)
- Click "Add file" → "Create new file"
- Name: `LICENSE`
- Choose a license template (MIT is common)
- Commit

### 4. Protect Main Branch (Optional)
- Settings → Branches
- Add rule for `main` branch
- Require pull request reviews

---

## 🆘 Troubleshooting

### "Permission denied" error
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/the-golden-rose.git
```

### "Repository not found" error
- Check your GitHub username is correct
- Make sure repository exists on GitHub
- Check you're logged in to GitHub

### Large file error
- Make sure `node_modules/` is in `.gitignore`
- Remove it if accidentally added:
  ```bash
  git rm -r --cached node_modules
  git commit -m "Remove node_modules"
  ```

### Need to update after changes
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 📞 Need Help?

- GitHub Docs: https://docs.github.com/
- Git Tutorial: https://git-scm.com/docs/gittutorial
- GitHub Desktop Help: https://docs.github.com/en/desktop

---

## ✅ Verification

After uploading, verify:
1. ✅ All files are visible on GitHub
2. ✅ README displays correctly
3. ✅ `.gitignore` is working (no `node_modules/`)
4. ✅ Repository description is set
5. ✅ License is added (if desired)

---

**Good luck! 🚀**
