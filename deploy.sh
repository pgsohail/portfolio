#!/bin/bash

# GitHub deployment script for portfolio

echo "🚀 Deploying portfolio to GitHub Pages..."

# Check if remote exists
if ! git remote get-url origin &> /dev/null; then
    echo "📦 Adding GitHub remote..."
    git remote add origin https://github.com/pgsohail/portfolio.git
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to https://github.com/pgsohail/portfolio/settings/pages"
    echo "2. Under 'Source', select 'Deploy from a branch'"
    echo "3. Select 'main' branch and '/ (root)' folder"
    echo "4. Click 'Save'"
    echo "5. Your site will be live at: https://pgsohail.github.io/portfolio/"
else
    echo "❌ Push failed. Make sure the repository exists on GitHub."
    echo "   Create it at: https://github.com/new"
    echo "   Repository name: portfolio"
    echo "   Make it public"
    echo "   Don't initialize with README (we already have one)"
fi

