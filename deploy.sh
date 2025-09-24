#!/bin/bash

# 🚀 AI Playlist Generator - Quick Deployment Script
# This script helps you deploy your app to various platforms

echo "🎵 AI Playlist Generator - Deployment Helper"
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "Choose your deployment platform:"
echo "1. Local Development"
echo "2. Vercel (Recommended)"
echo "3. Netlify + Heroku"
echo "4. Docker"
echo "5. Show Environment Variables Template"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🔧 Starting Local Development..."
        echo "Starting backend server..."
        cd backend && npm install && node server.js &
        BACKEND_PID=$!
        
        echo "Starting frontend server..."
        cd ../frontend && npm install && npm start &
        FRONTEND_PID=$!
        
        echo "✅ Servers started!"
        echo "🌐 Frontend: http://localhost:3000"
        echo "⚡ Backend: http://localhost:5000"
        echo ""
        echo "Press Ctrl+C to stop all servers"
        
        # Wait for user interrupt
        trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
        wait
        ;;
        
    2)
        echo "🌐 Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "Deploying backend..."
        cd backend
        vercel --prod
        
        echo "Deploying frontend..."
        cd ../frontend
        vercel --prod
        
        echo "✅ Deployed to Vercel!"
        echo "📝 Don't forget to set environment variables in Vercel dashboard"
        ;;
        
    3)
        echo "🌐 Deploying to Netlify + Heroku..."
        
        # Build frontend for Netlify
        echo "Building frontend for Netlify..."
        cd frontend
        npm install
        npm run build
        
        echo "✅ Frontend built! Upload the 'build' folder to Netlify"
        
        # Heroku backend deployment
        if command -v heroku &> /dev/null; then
            echo "Deploying backend to Heroku..."
            cd ../backend
            heroku create ai-playlist-generator-backend
            git add .
            git commit -m "Deploy to Heroku"
            git push heroku main
        else
            echo "⚠️  Heroku CLI not found. Please install it to deploy backend."
            echo "Frontend build is ready in frontend/build/"
        fi
        ;;
        
    4)
        echo "🐳 Setting up Docker deployment..."
        
        # Create Dockerfiles if they don't exist
        if [ ! -f "backend/Dockerfile" ]; then
            echo "Creating backend Dockerfile..."
            cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
EOF
        fi
        
        if [ ! -f "frontend/Dockerfile" ]; then
            echo "Creating frontend Dockerfile..."
            cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
        fi
        
        if [ ! -f "docker-compose.yml" ]; then
            echo "Creating docker-compose.yml..."
            cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
      - SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_CLERK_PUBLISHABLE_KEY=${REACT_APP_CLERK_PUBLISHABLE_KEY}
      - REACT_APP_API_BASE_URL=http://localhost:5000/api
    depends_on:
      - backend
EOF
        fi
        
        echo "🐳 Docker files created!"
        echo "Run: docker-compose up -d"
        ;;
        
    5)
        echo "📋 Environment Variables Template"
        echo "================================"
        echo ""
        echo "Frontend (.env):"
        echo "REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here"
        echo "REACT_APP_API_BASE_URL=https://your-backend-url.com/api"
        echo ""
        echo "Backend (.env):"
        echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator"
        echo "SPOTIFY_CLIENT_ID=your_spotify_client_id"
        echo "SPOTIFY_CLIENT_SECRET=your_spotify_client_secret"
        echo "GEMINI_API_KEY=your_gemini_api_key"
        echo "CLERK_SECRET_KEY=sk_live_your_clerk_secret"
        echo "PORT=5000"
        echo "CORS_ORIGIN=https://your-frontend-url.com"
        echo "NODE_ENV=production"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed deployment instructions, see DEPLOYMENT_GUIDE.md"
echo "🎉 Happy deploying!"