#!/bin/bash

echo "🚀 Starting Quantum Backend Server..."

cd server

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start the server
echo "🔥 Backend running on http://localhost:3001"
npm run dev