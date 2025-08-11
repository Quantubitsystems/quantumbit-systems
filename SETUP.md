# Quantum Systems Setup Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values with your actual information

3. **Set up EmailJS (for contact form):**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Create an account and service
   - Create an email template
   - Update `.env` with your EmailJS credentials

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📧 EmailJS Setup

1. **Create EmailJS Account:**
   - Visit https://www.emailjs.com/
   - Sign up for a free account

2. **Create Email Service:**
   - Add your email service (Gmail, Outlook, etc.)
   - Note the Service ID

3. **Create Email Template:**
   - Create a new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{phone}}` - Sender's phone
     - `{{service}}` - Service interested in
     - `{{message}}` - Message content
     - `{{to_name}}` - Your business name

4. **Get Public Key:**
   - Go to Account > API Keys
   - Copy your Public Key

5. **Update Environment Variables:**
   ```env
   VITE_EMAILJS_SERVICE_ID="your_service_id"
   VITE_EMAILJS_TEMPLATE_ID="your_template_id"
   VITE_EMAILJS_PUBLIC_KEY="your_public_key"
   ```

## 🔧 Configuration

Update `.env` file with your business information:

```env
# Business Configuration
VITE_BUSINESS_NAME="Your Business Name"
VITE_BUSINESS_EMAIL="your@email.com"
VITE_BUSINESS_PHONE="+1234567890"
VITE_WHATSAPP_NUMBER="+1234567890"
VITE_BUSINESS_ADDRESS="Your Address"
```

## 🌐 Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider:**
   - Upload `dist` folder contents
   - Configure environment variables on your hosting platform

## ✅ What's Now Functional

- ✅ Real contact form with email sending
- ✅ Form validation with error messages
- ✅ Working WhatsApp integration
- ✅ Clickable phone/email links
- ✅ FAQ, Privacy Policy, and Terms pages
- ✅ Environment-based configuration
- ✅ Loading states and error handling
- ✅ Responsive design

## 🎯 Next Steps (Optional)

- Set up Google Analytics
- Add a blog/CMS system
- Implement e-commerce functionality
- Add user authentication
- Set up a backend API
- Add payment processing

## 📞 Support

If you need help setting this up, contact the developer or refer to the documentation of the respective services (EmailJS, hosting provider, etc.).