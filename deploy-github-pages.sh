#!/bin/bash

# 🚀 GitHub Pages Deployment Script
# Deploys frontend to GitHub Pages and provides backend deployment options

echo "🎵 AI Playlist Generator - GitHub Pages Deployment"
echo "================================================="

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "📋 Deployment Plan:"
echo "✅ Frontend → GitHub Pages (Static hosting)"
echo "⚡ Backend → External platform (Server required)"
echo ""

# Step 1: Frontend deployment to GitHub Pages
echo "🌐 Step 1: Deploying Frontend to GitHub Pages..."
cd frontend

# Check if gh-pages is installed
if ! npm list gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "⚠️  Creating production environment template..."
    cat > .env.production << 'EOF'
# Add your production environment variables here
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_live_key_here
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
EOF
    echo "📝 Please edit frontend/.env.production with your production API keys"
    echo "   Then run this script again"
    exit 1
fi

# Build and deploy to GitHub Pages
echo "🔨 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "🚀 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend deployed to GitHub Pages!"
        echo "🌐 Your app will be available at: https://hs-2428.github.io/ai-playlist-generator"
        echo ""
    else
        echo "❌ GitHub Pages deployment failed"
        exit 1
    fi
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Step 2: Backend deployment options
cd ../backend
echo "⚡ Step 2: Backend Deployment Options"
echo "===================================="
echo ""
echo "Your backend needs to be deployed separately. Choose an option:"
echo ""
echo "🔥 RECOMMENDED FREE OPTIONS:"
echo "1. Railway (railway.app) - Easy deployment with GitHub integration"
echo "2. Render (render.com) - Free tier with automatic deployments"
echo "3. Fly.io (fly.io) - Free tier with great performance"
echo ""
echo "💰 PREMIUM OPTIONS:"
echo "4. Vercel - Serverless functions"
echo "5. Heroku - Traditional hosting"
echo ""

read -p "Choose deployment platform (1-5): " backend_choice

case $backend_choice in
    1)
        echo "🚄 Railway Deployment Instructions:"
        echo "1. Go to https://railway.app"
        echo "2. Connect your GitHub account"
        echo "3. Create new project from your repo"
        echo "4. Select the backend folder"
        echo "5. Add environment variables in Railway dashboard"
        echo "6. Deploy automatically!"
        ;;
    2)
        echo "🎨 Render Deployment Instructions:"
        echo "1. Go to https://render.com"
        echo "2. Connect GitHub account"
        echo "3. Create new 'Web Service'"
        echo "4. Select your repository"
        echo "5. Set Root Directory: backend"
        echo "6. Set Build Command: npm install"
        echo "7. Set Start Command: node server.js"
        echo "8. Add environment variables"
        ;;
    3)
        echo "🪰 Fly.io Deployment:"
        if command -v fly &> /dev/null; then
            echo "Setting up Fly.io deployment..."
            fly launch
        else
            echo "Please install Fly CLI first:"
            echo "curl -L https://fly.io/install.sh | sh"
        fi
        ;;
    4)
        echo "▲ Vercel Deployment:"
        if command -v vercel &> /dev/null; then
            echo "Deploying to Vercel..."
            vercel --prod
        else
            echo "Please install Vercel CLI first:"
            echo "npm install -g vercel"
        fi
        ;;
    5)
        echo "🟣 Heroku Deployment:"
        if command -v heroku &> /dev/null; then
            echo "Deploying to Heroku..."
            heroku create ai-playlist-generator-backend
            git subtree push --prefix backend heroku main
        else
            echo "Please install Heroku CLI first:"
            echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
        fi
        ;;
    *)
        echo "ℹ️  Manual deployment selected. Check DEPLOYMENT_GUIDE.md for detailed instructions."
        ;;
esac

echo ""
echo "📝 IMPORTANT NEXT STEPS:"
echo "1. Deploy your backend using one of the options above"
echo "2. Update frontend/.env.production with your backend URL"
echo "3. Run 'npm run deploy' again to update the frontend"
echo ""
echo "🔐 ENVIRONMENT VARIABLES NEEDED:"
echo "Backend:"
echo "- MONGODB_URI"
echo "- SPOTIFY_CLIENT_ID" 
echo "- SPOTIFY_CLIENT_SECRET"
echo "- GEMINI_API_KEY"
echo "- CLERK_SECRET_KEY"
echo ""
echo "Frontend:"
echo "- REACT_APP_CLERK_PUBLISHABLE_KEY"
echo "- REACT_APP_API_BASE_URL"
echo ""
echo "🎉 GitHub Pages deployment complete!"
echo "📚 See GITHUB_PAGES_DEPLOYMENT.md for detailed instructions"