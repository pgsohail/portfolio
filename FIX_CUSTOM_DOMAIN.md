# Fix: Remove Custom Domain to Make Site Work

## Problem
Your GitHub Pages is configured with a custom domain `pgsohail.me` that's not working, which prevents your site from loading.

## Solution: Remove Custom Domain

1. **Go to GitHub Pages Settings**: https://github.com/pgsohail/portfolio/settings/pages

2. **Remove Custom Domain**:
   - Scroll down to the **"Custom domain"** section
   - Clear the input field (remove `pgsohail.me`)
   - Click **"Remove"** button
   - Click **"Save"**

3. **Wait 2-3 minutes** for GitHub to update

4. **Your site will work at**: 
   **https://pgsohail.github.io/portfolio/**

## Alternative: Keep Custom Domain (If you own pgsohail.me)

If you want to use `pgsohail.me`, you need to:
1. Configure DNS records for `pgsohail.me` to point to GitHub Pages
2. Add the domain in GitHub Pages settings
3. Wait for DNS propagation (can take up to 24 hours)

For now, **removing the custom domain is the quickest solution** to get your site working!

