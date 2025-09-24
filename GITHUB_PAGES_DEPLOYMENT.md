# 🚀 GitHub Pages Deployment Guide

GitHub Pages is perfect for deploying your **frontend**, but since it only serves static files, you'll need a separate solution for your **backend**. Here's how to set it up:

## 📋 What Can Be Deployed to GitHub Pages

✅ **Frontend (React App)** - Perfect fit!
❌ **Backend (Node.js/Express)** - Needs a server platform

## 🌐 Complete GitHub Pages Setup

### Step 1: Frontend Deployment to GitHub Pages

1. **Install GitHub Pages deployment package:**
```bash
cd frontend
npm install --save-dev gh-pages
```

2. **Add deployment scripts to frontend/package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://hs-2428.github.io/ai-playlist-generator"
}
```

3. **Deploy to GitHub Pages:**
```bash
npm run deploy
```

### Step 2: Backend Deployment (Required Separately)

Since GitHub Pages can't host your backend, choose one of these **free** options:

#### Option A: Railway (Recommended - Free Tier)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway deploy
```

#### Option B: Render (Free Tier)
- Go to [render.com](https://render.com)
- Connect your GitHub repository
- Create a new Web Service
- Set build command: `npm install`
- Set start command: `node server.js`
- Add environment variables

#### Option C: Fly.io (Free Tier)
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
cd backend
fly launch
fly deploy
```

### Step 3: Update Frontend Configuration

Update your frontend environment variables to point to your deployed backend:

**frontend/.env.production:**
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

## 🔧 Automated GitHub Pages Setup Script

Let me create this for you: