#!/bin/bash

# Portfolio Deployment Status Checker
# This script helps verify if your portfolio is correctly set up for GitHub Pages

echo "=========================================="
echo "Portfolio Deployment Status Checker"
echo "=========================================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
echo "📦 Repository: $REPO_URL"

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "🌿 Current branch: $CURRENT_BRANCH"

# Check for critical files
echo ""
echo "Checking required files..."
echo ""

# Check .nojekyll
if [ -f ".nojekyll" ]; then
    echo "✅ .nojekyll file exists (prevents Jekyll processing)"
else
    echo "❌ .nojekyll file missing! Creating it..."
    touch .nojekyll
    echo "✅ Created .nojekyll file"
fi

# Check index.html
if [ -f "index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing! This is required for GitHub Pages"
fi

# Check for CNAME (should not exist unless using custom domain)
if [ -f "CNAME" ]; then
    echo "⚠️  CNAME file exists - you have a custom domain configured"
    echo "   If your custom domain is not working, remove this file:"
    echo "   git rm CNAME && git commit -m 'Remove custom domain' && git push"
else
    echo "✅ No CNAME file (good - using GitHub Pages default URL)"
fi

# Check for GitHub Actions workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions deployment workflow exists"
else
    echo "⚠️  No GitHub Actions workflow found"
    echo "   You can still use branch deployment from Settings → Pages"
fi

# Check CSS and JS
if [ -f "css/style.css" ]; then
    echo "✅ CSS file exists"
else
    echo "❌ css/style.css missing!"
fi

if [ -f "js/main.js" ]; then
    echo "✅ JavaScript file exists"
else
    echo "❌ js/main.js missing!"
fi

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Enable GitHub Pages:"
echo "   https://github.com/pgsohail/portfolio/settings/pages"
echo ""
echo "2. Configure deployment:"
echo "   - Source: Deploy from a branch OR GitHub Actions"
echo "   - Branch: $CURRENT_BRANCH (or main/master)"
echo "   - Folder: / (root)"
echo ""
echo "3. Your site will be live at:"
echo "   https://pgsohail.github.io/portfolio/"
echo ""
echo "4. Check deployment status:"
echo "   https://github.com/pgsohail/portfolio/actions"
echo ""
echo "For detailed instructions, see SETUP.md"
echo "=========================================="
