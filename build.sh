#!/bin/bash

echo "🚀 Building Quantum Systems for production..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please copy .env.example to .env and configure it."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Built files are in the 'dist' directory"
    echo "🌐 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi