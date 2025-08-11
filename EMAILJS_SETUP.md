# EmailJS Setup Checklist

## ✅ Steps to Complete:

### 1. EmailJS Dashboard Setup
- [x] Created EmailJS account
- [ ] Added Gmail service (alexkinyua624@gmail.com)
- [ ] Noted Service ID
- [ ] Created email template (see emailjs-template.txt)
- [ ] Noted Template ID
- [ ] Got Public Key from Account settings

### 2. Update .env File
Replace these values in your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID="service_xxxxxxx"     # From Gmail service
VITE_EMAILJS_TEMPLATE_ID="template_xxxxxxx"   # From email template
VITE_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxxxx"   # From Account > API Keys
```

### 3. Test Contact Form
- [ ] Start dev server: `npm run dev`
- [ ] Go to Contact page
- [ ] Fill out and submit form
- [ ] Check your Gmail for the email

### 4. Troubleshooting
If emails don't arrive:
- Check EmailJS dashboard logs
- Verify template variables match code
- Check Gmail spam folder
- Ensure service is active

## 🎯 Current Status:
- Account: ✅ Created
- Service: ⏳ Pending setup
- Template: ⏳ Pending setup
- Testing: ⏳ Pending

## 📧 Your Email: alexkinyua624@gmail.com