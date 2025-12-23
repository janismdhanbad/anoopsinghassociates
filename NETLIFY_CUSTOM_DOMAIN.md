# Netlify Custom Domain Setup Guide

## ✅ Yes! Custom Domains are FREE on Netlify

Netlify offers **free custom domain support** including automatic SSL certificates. This is one of their best features!

---

## 🚀 Step-by-Step Setup

### Step 1: Add Your Domain to Netlify

1. **Deploy your site to Netlify** (if not already done)
   - Drag & drop your folder, or
   - Connect your GitHub repo

2. **Go to Domain Settings:**
   - In Netlify dashboard, click on your site
   - Go to **"Domain settings"** (or **"Site settings"** → **"Domain management"**)
   - Click **"Add custom domain"**

3. **Enter your domain:**
   - Type your domain: `www.anoopsinghassociates.com` or `anoopsinghassociates.com`
   - Click **"Verify"** or **"Add domain"**

4. **Netlify will show DNS instructions:**
   - You'll see what DNS records to add
   - Keep this page open - you'll need it!

---

### Step 2: Configure DNS at Your Domain Registrar

You need to add DNS records at wherever you bought your domain (GoDaddy, Namecheap, Google Domains, etc.)

#### Option A: CNAME Method (Recommended for www subdomain)

**If you want:** `www.anoopsinghassociates.com`

1. **At your domain registrar:**
   - Go to DNS management
   - Add a **CNAME** record:
     - **Name/Host:** `www`
     - **Value/Target:** `your-site-name.netlify.app` (your Netlify subdomain)
     - **TTL:** 3600 (or default)

2. **For root domain** (`anoopsinghassociates.com`):
   - Netlify will show you **A records** to add
   - Add these IP addresses (usually 4 A records):
     ```
     75.2.60.5
     99.83.190.102
     ```
   - Or use Netlify's DNS (see Option B below)

#### Option B: Use Netlify DNS (Easiest)

**If you want:** Both `www` and root domain (`anoopsinghassociates.com`)

1. **In Netlify Domain Settings:**
   - Click **"Add domain"** → **"Set up Netlify DNS"**
   - Netlify will provide nameservers

2. **At your domain registrar:**
   - Go to DNS/Nameserver settings
   - Replace your nameservers with Netlify's:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - Save changes

3. **Netlify automatically configures everything:**
   - Both www and root domain work
   - SSL certificates auto-provisioned
   - DNS managed by Netlify

---

### Step 3: Wait for DNS Propagation

- **DNS changes take 24-48 hours** to propagate globally
- Usually works within **1-2 hours**
- You can check status in Netlify dashboard

### Step 4: SSL Certificate (Automatic!)

- Netlify **automatically provisions SSL certificates** via Let's Encrypt
- Takes **5-15 minutes** after DNS is configured
- You'll see "SSL certificate provisioning" status in Netlify
- Once ready, your site will have HTTPS automatically!

---

## 📋 Common Domain Registrars Setup

### GoDaddy

1. Log in → My Products → DNS
2. Add CNAME record:
   - **Host:** `www`
   - **Points to:** `your-site.netlify.app`
   - **TTL:** 600 seconds
3. For root domain, add A records (shown in Netlify)

### Namecheap

1. Domain List → Manage → Advanced DNS
2. Add CNAME record:
   - **Host:** `www`
   - **Value:** `your-site.netlify.app`
   - **TTL:** Automatic
3. For root domain, add A records

### Google Domains

1. DNS → Custom resource records
2. Add CNAME:
   - **Name:** `www`
   - **Type:** CNAME
   - **Data:** `your-site.netlify.app`
3. For root domain, add A records

### Cloudflare

1. DNS → Add record
2. Add CNAME:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `your-site.netlify.app`
   - **Proxy status:** DNS only (orange cloud OFF)
3. For root domain, add A records

---

## ✅ What You Get (All FREE!)

- ✅ Custom domain support
- ✅ Automatic SSL/HTTPS certificates
- ✅ Both www and root domain support
- ✅ Automatic certificate renewal
- ✅ CDN for fast global delivery
- ✅ DDoS protection

---

## 🔍 Verifying Your Setup

### Check DNS Propagation:
- Visit [whatsmydns.net](https://www.whatsmydns.net)
- Enter your domain
- Check if CNAME/A records are pointing correctly

### Check SSL Certificate:
- Once DNS is configured, Netlify will show "SSL certificate provisioning"
- Wait 5-15 minutes
- Your site will automatically have HTTPS

### Test Your Domain:
- Visit `https://www.anoopsinghassociates.com`
- Should load your Netlify site
- Should show padlock (HTTPS) in browser

---

## 🎯 Best Practices

### Recommended Setup:

1. **Use both www and root domain:**
   - `www.anoopsinghassociates.com` (primary)
   - `anoopsinghassociates.com` (redirects to www)

2. **Netlify automatically redirects:**
   - Root → www (or vice versa, your choice)
   - HTTP → HTTPS
   - Configure in Domain settings → HTTPS → Force HTTPS

3. **Set primary domain:**
   - In Netlify, set which domain is primary
   - Other domains redirect to primary

---

## 🐛 Troubleshooting

### Domain not working?

1. **Check DNS propagation:**
   - Use [whatsmydns.net](https://www.whatsmydns.net)
   - Wait 24-48 hours if recently changed

2. **Verify DNS records:**
   - Check records match Netlify's instructions exactly
   - No typos in domain names

3. **Check SSL status:**
   - In Netlify dashboard → Domain settings
   - Look for SSL certificate status
   - May take 15-30 minutes after DNS is correct

4. **Clear browser cache:**
   - Try incognito/private window
   - Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### SSL certificate not provisioning?

- Wait 15-30 minutes after DNS is correct
- Check DNS records are correct
- Contact Netlify support if still not working after 24 hours

---

## 💡 Pro Tips

1. **Use Netlify DNS** for easiest management (Option B above)
2. **Enable "Force HTTPS"** in Domain settings
3. **Set up redirects** if you have multiple domains
4. **Monitor SSL certificate** expiry (auto-renewed, but good to check)

---

## 📞 Need Help?

- Netlify has excellent documentation: [docs.netlify.com](https://docs.netlify.com)
- Netlify support is very responsive
- Check Netlify dashboard for status messages

---

## 🎉 Summary

**Custom domains on Netlify:**
- ✅ Completely FREE
- ✅ Automatic SSL certificates
- ✅ Easy setup (especially with Netlify DNS)
- ✅ Works with any domain registrar
- ✅ Professional and secure

Your site will be live at your custom domain with HTTPS automatically! 🚀

