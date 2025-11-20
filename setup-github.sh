#!/bin/bash

echo "🔧 Setting up GitHub repository..."

# Check if GitHub token exists
if [ -z "$GITHUB_TOKEN" ]; then
    echo "📝 Manual setup required:"
    echo ""
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: portfolio"
    echo "3. Make it Public"
    echo "4. DO NOT initialize with README, .gitignore, or license"
    echo "5. Click 'Create repository'"
    echo ""
    echo "After creating the repo, run: ./deploy.sh"
    echo ""
    read -p "Press Enter after you've created the repository..."
fi

# Try to create repo via API if token exists
if [ ! -z "$GITHUB_TOKEN" ]; then
    echo "🔑 Using GitHub token to create repository..."
    curl -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d '{"name":"portfolio","description":"Portfolio website with iMessage-style interface","private":false}' \
        2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Repository created!"
    fi
fi

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed!"
    echo ""
    echo "🌐 Enable GitHub Pages:"
    echo "1. Go to: https://github.com/pgsohail/portfolio/settings/pages"
    echo "2. Source: Deploy from a branch"
    echo "3. Branch: main, Folder: / (root)"
    echo "4. Click Save"
    echo ""
    echo "Your site will be live at:"
    echo "https://pgsohail.github.io/portfolio/"
fi
