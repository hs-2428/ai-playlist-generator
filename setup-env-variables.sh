#!/bin/bash

# 🔐 Environment Variables Setup Helper
# This script helps you prepare environment variables for deployment

echo "🔐 AI Playlist Generator - Environment Variables Setup"
echo "===================================================="

# Read current environment variables
echo ""
echo "📋 Current Environment Variables from your .env files:"
echo ""

if [ -f "backend/.env" ]; then
    echo "🔧 Backend Variables:"
    echo "===================="
    cat backend/.env | grep -v "^#" | grep -v "^$"
    echo ""
else
    echo "❌ backend/.env not found!"
    echo ""
fi

if [ -f "frontend/.env" ]; then
    echo "🎨 Frontend Variables:"
    echo "===================="
    cat frontend/.env | grep -v "^#" | grep -v "^$"
    echo ""
else
    echo "❌ frontend/.env not found!"
    echo ""
fi

echo "🚀 Environment Variables for Production Deployment:"
echo "================================================="
echo ""
echo "📝 COPY THESE FOR YOUR DEPLOYMENT PLATFORM:"
echo ""
echo "Backend Environment Variables:"
echo "-----------------------------"
echo "MONGODB_URI=your_mongodb_connection_string"
echo "SPOTIFY_CLIENT_ID=your_spotify_client_id"
echo "SPOTIFY_CLIENT_SECRET=your_spotify_client_secret"
echo "GEMINI_API_KEY=your_gemini_api_key"
echo "CLERK_SECRET_KEY=your_clerk_secret_key"
echo "NODE_ENV=production"
echo "PORT=5000"
echo "CORS_ORIGIN=https://hs-2428.github.io"
echo ""
echo "Frontend Environment Variables:"
echo "------------------------------"
echo "REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key"
echo "REACT_APP_API_BASE_URL=https://your-backend-url.com/api"
echo ""

echo "🌐 Platform-Specific Instructions:"
echo "=================================="
echo ""
echo "🚄 Railway:"
echo "1. Dashboard → Settings → Variables"
echo "2. Add each variable name and value"
echo "3. Set Root Directory to: backend"
echo ""
echo "🎨 Render:"
echo "1. Dashboard → Environment"
echo "2. Add each KEY=value pair"
echo "3. Set Root Directory to: backend"
echo "4. Build Command: npm install"
echo "5. Start Command: node server.js"
echo ""
echo "🪰 Fly.io:"
echo "1. Use: fly secrets set KEY=\"value\""
echo "2. Example: fly secrets set NODE_ENV=\"production\""
echo ""
echo "▲ Vercel:"
echo "1. Dashboard → Settings → Environment Variables"
echo "2. Add each variable for Production environment"
echo ""

echo "⚠️  IMPORTANT SECURITY NOTES:"
echo "=========================="
echo "🔒 Use LIVE/PRODUCTION keys for:"
echo "   - Clerk (pk_live_... and sk_live_...)"
echo "   - MongoDB (production database)"
echo "   - Spotify (production app credentials)"
echo ""
echo "🌐 Update CORS_ORIGIN to match your GitHub Pages URL:"
echo "   CORS_ORIGIN=https://hs-2428.github.io"
echo ""
echo "📚 For detailed setup instructions, see BACKEND_DEPLOYMENT_SETUP.md"