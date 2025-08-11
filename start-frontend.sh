#!/bin/bash

echo "🚀 Starting Quantum Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start the frontend
echo "🔥 Frontend running on http://localhost:8080"
npm run dev