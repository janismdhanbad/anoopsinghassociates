# GitHub Pages + Formspree Setup Guide

## ✅ Form is Ready!

I've updated your contact form to work with Formspree. Now you just need to:

1. **Get your Formspree form ID**
2. **Update one line in your HTML**
3. **Deploy to GitHub Pages**

---

## 🚀 Step-by-Step Setup

### Step 1: Create Formspree Account & Form

1. **Sign up:** Go to [formspree.io](https://formspree.io) and click "Sign Up" (free)
   - You can sign up with Google, GitHub, or email

2. **Create a new form:**
   - After signing in, click **"New Form"** button
   - Give it a name: `Contact Form` or `Anoop Singh Associates Contact`
   - Click **"Create Form"**

3. **Get your Form ID:**
   - You'll see a form endpoint that looks like: `https://formspree.io/f/YOUR_FORM_ID`
   - Copy the `YOUR_FORM_ID` part (it's a long string like `xrgkqjvw` or `mknqyzpn`)

### Step 2: Update Your HTML File

1. **Open `index.html`**

2. **Find this line (around line 446):**
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. **Replace `YOUR_FORM_ID`** with your actual Formspree form ID:
   ```html
   <form class="contact-form" action="https://formspree.io/f/xrgkqjvw" method="POST">
   ```
   (Use YOUR actual form ID, not `xrgkqjvw`)

4. **Save the file**

### Step 3: Deploy to GitHub Pages

1. **Initialize Git** (if not already done):
   ```bash
   cd /Users/janpreet/janpreet_work/dads_website
   git init
   git add .
   git commit -m "Initial commit with Formspree integration"
   ```

2. **Create GitHub Repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., `anoopsingh-associates-website`)
   - **Important:** Make it public (required for free GitHub Pages)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values)

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **"Settings"** tab
   - Scroll down to **"Pages"** in the left sidebar
   - Under **"Source"**, select **"Deploy from a branch"**
   - Select branch: **`main`**
   - Select folder: **`/ (root)`**
   - Click **"Save"**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 4: Configure Formspree Email Notifications

1. **Go to Formspree Dashboard:**
   - Visit [dashboard.formspree.io](https://dashboard.formspree.io)
   - Click on your form

2. **Set up email notifications:**
   - Go to **"Settings"** tab
   - Under **"Email Notifications"**, enter your email address
   - Click **"Save"**

3. **Optional - Customize email:**
   - You can customize the email subject and format
   - The form already includes a custom subject: "New Contact Form Submission from Anoop Singh & Associates Website"

---

## ✨ Features Included

✅ **Form Validation** - Validates required fields and email format  
✅ **Loading State** - Button shows "Sending..." while submitting  
✅ **Success Message** - Shows green success message after submission  
✅ **Error Handling** - Shows red error message if something goes wrong  
✅ **Spam Protection** - Formspree includes built-in spam filtering  
✅ **Email Notifications** - You'll receive emails for each submission  
✅ **Form Reset** - Form clears after successful submission  

---

## 📧 Testing Your Form

1. **After deployment, visit your live site**
2. **Fill out the contact form**
3. **Submit it**
4. **Check:**
   - You should see a success message on the page
   - You should receive an email at the address you configured in Formspree
   - Check Formspree dashboard to see the submission

---

## 🔒 Spam Protection

Formspree includes:
- Built-in spam filtering
- Rate limiting (prevents abuse)
- Honeypot field (hidden field that bots might fill)

If you need more protection, you can add Google reCAPTCHA later.

---

## 📊 Viewing Submissions

You can view all form submissions in two ways:

1. **Formspree Dashboard:**
   - Go to [dashboard.formspree.io](https://dashboard.formspree.io)
   - Click on your form
   - See all submissions with timestamps

2. **Email Notifications:**
   - You'll receive an email for each submission
   - Email includes all form fields

---

## 💰 Pricing

**Free Tier:**
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ Spam protection
- ✅ Form analytics

**Paid Plans:**
- $10/month for unlimited submissions
- Additional features like webhooks, custom redirects, etc.

For most small businesses, the free tier is sufficient!

---

## 🐛 Troubleshooting

### Form not submitting?
- Check that you replaced `YOUR_FORM_ID` with your actual Formspree form ID
- Check browser console for errors (F12 → Console)
- Verify your Formspree form is active

### Not receiving emails?
- Check Formspree dashboard → Settings → Email Notifications
- Check your spam folder
- Verify email address is correct

### Form shows error?
- Make sure all required fields are filled
- Check internet connection
- Verify Formspree form ID is correct

---

## 🎯 Quick Checklist

- [ ] Created Formspree account
- [ ] Created new form and got Form ID
- [ ] Updated `index.html` with your Form ID
- [ ] Committed changes to Git
- [ ] Pushed to GitHub
- [ ] Enabled GitHub Pages
- [ ] Configured email notifications in Formspree
- [ ] Tested the form on live site

---

## 📝 Next Steps After Setup

1. **Test the form** on your live GitHub Pages site
2. **Set up email notifications** in Formspree
3. **Optional:** Add a custom domain to GitHub Pages
4. **Optional:** Customize the success/error messages in `script.js`

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console (F12) for errors
2. Verify your Formspree form ID is correct
3. Make sure GitHub Pages is enabled and deployed
4. Check Formspree dashboard for any error messages

Your form is now ready to work with GitHub Pages! 🚀

