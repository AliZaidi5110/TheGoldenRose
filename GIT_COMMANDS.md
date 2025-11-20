# 🚀 Quick Git Commands Reference

## Initial Upload to GitHub

```bash
# 1. Initialize git in your project folder
git init

# 2. Add all files
git add .

# 3. Create first commit
git commit -m "Initial commit: The Golden Rose website"

# 4. Add GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/the-golden-rose.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

## Daily Git Commands

### Check Status
```bash
git status
```

### Add Changes
```bash
# Add all changes
git add .

# Add specific file
git add src/pages/Home.jsx
```

### Commit Changes
```bash
git commit -m "Your commit message here"
```

### Push to GitHub
```bash
git push
```

### Pull Latest Changes
```bash
git pull
```

## Common Workflows

### After Making Changes
```bash
git add .
git commit -m "Update: description of what you changed"
git push
```

### View Commit History
```bash
git log
```

### Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Discard All Local Changes
```bash
git reset --hard
```

## Branch Commands

### Create New Branch
```bash
git checkout -b feature-name
```

### Switch Branch
```bash
git checkout main
```

### Merge Branch
```bash
git checkout main
git merge feature-name
```

### Delete Branch
```bash
git branch -d feature-name
```

## Useful Commands

### See Remote URL
```bash
git remote -v
```

### Change Remote URL
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/the-golden-rose.git
```

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/the-golden-rose.git
```

## 🆘 Emergency Commands

### Remove File from Git (keep local)
```bash
git rm --cached filename
```

### Remove Folder from Git (keep local)
```bash
git rm -r --cached foldername
```

### Undo All Changes
```bash
git reset --hard HEAD
```

### Force Push (use carefully!)
```bash
git push -f origin main
```

## 📝 Good Commit Messages

✅ Good:
- "Add membership feature"
- "Update contact information"
- "Fix video display on mobile"
- "Improve About page design"

❌ Bad:
- "update"
- "fix"
- "changes"
- "asdf"

## 🎯 Quick Reference

| Command | What it does |
|---------|-------------|
| `git status` | Check what changed |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Save changes |
| `git push` | Upload to GitHub |
| `git pull` | Download from GitHub |
| `git log` | View history |

---

**Pro Tip:** Commit often with clear messages! 💡
