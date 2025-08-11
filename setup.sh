#!/bin/bash

echo "🚀 Setting up QuantumBit Systems website..."

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from example"
    echo "📝 Please edit .env file with your actual values:"
    echo "   - Add your Google Analytics tracking ID"
    echo "   - Update API URL if needed"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start the backend: npm run start:backend"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌟 Your website will be ready at http://localhost:8080"