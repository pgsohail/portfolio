# Deployment Instructions

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `portfolio`
3. Description: `Portfolio website with iMessage-style interface`
4. Make it **Public**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 2: Push to GitHub

Run these commands in your terminal:

```bash
cd /Users/pgsohail/Desktop/website
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/pgsohail/portfolio/settings/pages
2. Under **"Source"**, select **"Deploy from a branch"**
3. Select **"main"** branch
4. Select **"/ (root)"** folder
5. Click **"Save"**

### Step 4: Access Your Site

After a few minutes, your portfolio will be live at:
**https://pgsohail.github.io/portfolio/**

---

## Alternative: Use the Deploy Script

Simply run:
```bash
./deploy.sh
```

This will guide you through the process.

