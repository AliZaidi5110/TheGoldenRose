@echo off
echo ========================================
echo  The Golden Rose - GitHub Upload
echo ========================================
echo.
echo This will upload your project to:
echo https://github.com/AliZaidi5110/TheGoldenRose
echo.
pause
echo.

echo [1/6] Initializing Git...
git init
if errorlevel 1 goto error
echo ✓ Git initialized
echo.

echo [2/6] Adding all files...
git add .
if errorlevel 1 goto error
echo ✓ Files added
echo.

echo [3/6] Creating commit...
git commit -m "Initial commit: The Golden Rose website - Complete React + Tailwind project"
if errorlevel 1 goto error
echo ✓ Commit created
echo.

echo [4/6] Connecting to GitHub...
git remote add origin https://github.com/AliZaidi5110/TheGoldenRose.git
echo ✓ Connected to repository
echo.

echo [5/6] Setting main branch...
git branch -M main
if errorlevel 1 goto error
echo ✓ Branch set
echo.

echo [6/6] Pushing to GitHub...
echo (You may be asked to authenticate)
git push -u origin main
if errorlevel 1 (
    echo.
    echo Repository might have existing files. Trying force push...
    git push -u origin main --force
    if errorlevel 1 goto error
)
echo ✓ Upload complete!
echo.

echo ========================================
echo  SUCCESS! 
echo ========================================
echo.
echo Your code is now on GitHub:
echo https://github.com/AliZaidi5110/TheGoldenRose
echo.
echo Next steps:
echo 1. Visit the URL above to verify
echo 2. Deploy to Netlify or Vercel (optional)
echo.
pause
exit

:error
echo.
echo ========================================
echo  ERROR OCCURRED
echo ========================================
echo.
echo Please check the error message above.
echo.
echo Common solutions:
echo 1. Make sure Git is installed
echo 2. Check your internet connection
echo 3. Verify GitHub credentials
echo.
echo For help, see UPLOAD_INSTRUCTIONS.md
echo.
pause
exit
