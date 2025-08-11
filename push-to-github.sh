#!/bin/bash

echo "🚀 Pushing QuantumBit Systems to GitHub..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: QuantumBit Systems full-stack website

Features:
- React/TypeScript frontend with Tailwind CSS
- Node.js/Express backend with SQLite
- Admin dashboard for content management
- Blog system with CRUD operations
- Product catalog with WhatsApp ordering
- Contact forms with email integration
- SEO optimized pages
- Responsive design
- Ready for Cloudflare Pages + Railway deployment"

echo "✅ Files committed locally"
echo ""
echo "📝 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "4. Run: git branch -M main"
echo "5. Run: git push -u origin main"
echo ""
echo "🌟 Your project will be live on GitHub!"