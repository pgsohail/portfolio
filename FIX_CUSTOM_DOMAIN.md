# Fix: Custom Domain Issues

> **⚠️ This file is for reference only. See [SETUP.md](SETUP.md) for complete deployment instructions.**

## Problem
If your GitHub Pages was configured with a custom domain (like `pgsohail.me`) that's not working, it can prevent your site from loading.

## Solution: Remove Custom Domain

### Step 1: Remove CNAME file (if it exists)

```bash
# Check if CNAME exists
ls CNAME

# If it exists, remove it
git rm CNAME
git commit -m "Remove custom domain"
git push
```

### Step 2: Remove domain from GitHub Settings

1. **Go to GitHub Pages Settings**: https://github.com/pgsohail/portfolio/settings/pages

2. **Remove Custom Domain**:
   - Scroll down to the **"Custom domain"** section
   - Clear the input field (remove any domain)
   - Click **"Remove"** button
   - Click **"Save"**

3. **Wait 2-3 minutes** for GitHub to update

4. **Your site will work at**: 
   **https://pgsohail.github.io/portfolio/**

## Alternative: Configure Custom Domain Properly

If you want to use a custom domain like `pgsohail.me`, you need to:

1. **Own the domain** and have access to DNS settings
2. **Configure DNS records** in your domain provider:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: pgsohail.github.io
   ```
3. **Add domain in GitHub Pages settings**
4. **Wait for DNS propagation** (can take up to 24-48 hours)

For now, **removing the custom domain is the quickest solution** to get your site working!

---

## Complete Guide

For detailed instructions and troubleshooting, see **[SETUP.md](SETUP.md)**.

