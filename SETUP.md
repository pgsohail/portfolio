# Portfolio Website Setup Guide

## Quick Start - Make Your Website Live in 3 Steps! 🚀

Your portfolio is ready to go live! Follow these simple steps:

### Step 1: Enable GitHub Pages ⚙️

1. Go to your repository settings: https://github.com/pgsohail/portfolio/settings/pages
2. Under **"Source"**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or the branch containing your code)
   - **Folder**: `/ (root)`
3. Click **"Save"**

### Step 2: Wait for Deployment ⏱️

GitHub will automatically build and deploy your site. This usually takes 2-3 minutes.

You can check the deployment status at: https://github.com/pgsohail/portfolio/actions

### Step 3: Visit Your Live Site! 🌐

Your portfolio will be live at:
**https://pgsohail.github.io/portfolio/**

---

## Alternative: Use GitHub Actions (Recommended) 🎯

This repository includes a GitHub Actions workflow that automatically deploys your portfolio whenever you push changes.

### Enable GitHub Actions Deployment:

1. Go to: https://github.com/pgsohail/portfolio/settings/pages
2. Under **"Source"**, select **"GitHub Actions"**
3. Save the settings
4. Push any change to the `main` branch, and the workflow will automatically deploy your site!

**Benefits of GitHub Actions:**
- ✅ Automatic deployment on every push
- ✅ Better build process
- ✅ Deployment history and logs
- ✅ No manual configuration needed

---

## Troubleshooting 🔧

### Problem: Site shows 404 error

**Solution:**
- Make sure GitHub Pages is enabled in repository settings
- Verify the branch name is correct (`main` or `master`)
- Check that the `.nojekyll` file exists (it should be in the root)
- Wait 2-3 minutes after enabling/changing settings

### Problem: Custom domain not working

**Solution:**
If you see a CNAME file in your repository but don't own the domain:
1. Delete the `CNAME` file: `git rm CNAME && git commit -m "Remove custom domain" && git push`
2. Go to Settings → Pages → Remove custom domain
3. Your site will work at `https://pgsohail.github.io/portfolio/`

### Problem: Changes not showing up

**Solution:**
- Wait 1-2 minutes for deployment to complete
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Actions: https://github.com/pgsohail/portfolio/actions

### Problem: No `main` branch exists

**Solution:**
If your code is on a different branch (like `gh-pages` or a feature branch):

```bash
# Option 1: Rename current branch to main
git branch -m main
git push -u origin main

# Option 2: Or configure GitHub Pages to use your current branch
# Go to Settings → Pages → Select your current branch
```

---

## Making Changes 📝

To update your live site:

```bash
# 1. Make your changes to the files
# 2. Commit and push
git add .
git commit -m "Update portfolio"
git push

# 3. Wait 1-2 minutes for automatic deployment
```

---

## Testing Locally 🖥️

To test your portfolio before deploying:

```bash
# Start a local server
python3 -m http.server 8080

# Or use Node.js
npx http-server -p 8080

# Visit: http://localhost:8080
```

---

## Features ✨

- 🎨 iOS-style iMessage interface
- 🔊 Realistic typing and message sounds
- 📱 Fully responsive (works on mobile, tablet, desktop)
- 🎯 Smooth animations
- 🔗 Social media integration
- 🚀 Fast loading with optimized assets

---

## Need Help? 💬

- Check deployment status: https://github.com/pgsohail/portfolio/actions
- View deployment history: https://github.com/pgsohail/portfolio/deployments
- GitHub Pages documentation: https://docs.github.com/en/pages

---

**Your portfolio is ready! Just enable GitHub Pages and you're live!** 🎉
