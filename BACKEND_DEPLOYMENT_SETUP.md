# 🔧 Backend Deployment Configuration Guide

This guide shows you exactly how to set up the root directory and environment variables for deploying your backend to different platforms.

## 🚄 Railway (Recommended - Easiest)

### Step 1: Deploy to Railway

1. **Go to Railway**: https://railway.app
2. **Sign Up/Login**: Use your GitHub account
3. **Create New Project**: Click "New Project"
4. **Deploy from GitHub**: Select "Deploy from GitHub repo"
5. **Select Repository**: Choose `ai-playlist-generator`

### Step 2: Configure Root Directory

Railway will detect both frontend and backend folders. You need to:

1. **In Railway Dashboard**:
   - Click on your deployed service
   - Go to "Settings" tab
   - Find "Root Directory" setting
   - Set it to: `backend`

### Step 3: Set Environment Variables

In Railway Dashboard → Settings → Variables, add these:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=sk_live_your_clerk_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://hs-2428.github.io
```

### Step 4: Deploy Commands (Auto-detected)

Railway automatically detects:
- **Build Command**: `npm install`
- **Start Command**: `npm start` or `node server.js`

---

## 🎨 Render

### Step 1: Deploy to Render

1. **Go to Render**: https://render.com
2. **Sign Up/Login**: Connect GitHub account
3. **New Web Service**: Click "New +" → "Web Service"
4. **Connect Repository**: Select `ai-playlist-generator`

### Step 2: Configure Root Directory & Commands

In Render setup form:

```
Name: ai-playlist-generator-backend
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

### Step 3: Set Environment Variables

In Render Dashboard → Environment, add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=sk_live_your_clerk_secret
NODE_ENV=production
CORS_ORIGIN=https://hs-2428.github.io
```

---

## 🪰 Fly.io

### Step 1: Install Fly CLI

```bash
# macOS
curl -L https://fly.io/install.sh | sh

# Or with Homebrew
brew install flyctl
```

### Step 2: Deploy with Fly

```bash
cd backend
fly auth login
fly launch
```

### Step 3: Configure fly.toml (Auto-generated)

Fly creates a `fly.toml` file. Update it:

```toml
app = "your-app-name"
primary_region = "sjc"

[build]

[http_service]
  internal_port = 5000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

### Step 4: Set Environment Variables

```bash
fly secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator"
fly secrets set SPOTIFY_CLIENT_ID="your_client_id"
fly secrets set SPOTIFY_CLIENT_SECRET="your_client_secret"
fly secrets set GEMINI_API_KEY="your_gemini_key"
fly secrets set CLERK_SECRET_KEY="sk_live_your_clerk_secret"
fly secrets set NODE_ENV="production"
fly secrets set CORS_ORIGIN="https://hs-2428.github.io"
```

---

## ▲ Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy Backend

```bash
cd backend
vercel
```

### Step 3: Configure vercel.json

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### Step 4: Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=sk_live_your_clerk_secret
NODE_ENV=production
CORS_ORIGIN=https://hs-2428.github.io
```

---

## 🟣 Heroku

### Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku
```

### Step 2: Deploy Backend

```bash
cd backend
heroku login
heroku create your-app-name
```

### Step 3: Set Environment Variables

```bash
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator"
heroku config:set SPOTIFY_CLIENT_ID="your_client_id"
heroku config:set SPOTIFY_CLIENT_SECRET="your_client_secret"
heroku config:set GEMINI_API_KEY="your_gemini_key"
heroku config:set CLERK_SECRET_KEY="sk_live_your_clerk_secret"
heroku config:set NODE_ENV="production"
heroku config:set CORS_ORIGIN="https://hs-2428.github.io"
```

### Step 4: Deploy

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🔑 Your Environment Variables

Here are your specific environment variables to use:

### Backend Environment Variables:

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Clerk Authentication
CLERK_SECRET_KEY=sk_live_your_clerk_secret_key

# Server Configuration
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://hs-2428.github.io
```

### Frontend Environment Variables:

Update `frontend/.env.production`:

```env
# Clerk Authentication (Use LIVE keys for production)
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_live_clerk_key

# Backend API URL (Replace with your deployed backend URL)
REACT_APP_API_BASE_URL=https://your-backend-url.com/api

# Examples:
# Railway: https://your-app.railway.app/api
# Render: https://your-app.onrender.com/api
# Fly.io: https://your-app.fly.dev/api
# Vercel: https://your-backend.vercel.app/api
```

---

## 🚀 After Backend Deployment

1. **Get your backend URL** from your chosen platform
2. **Update frontend environment**:
   ```bash
   # Edit frontend/.env.production
   REACT_APP_API_BASE_URL=https://your-actual-backend-url.com/api
   ```
3. **Redeploy frontend**:
   ```bash
   cd frontend
   npm run deploy
   ```

## 💡 Quick Tips

- **Railway**: Easiest setup, automatic detection
- **Render**: Free tier, great for beginners
- **Fly.io**: Fast deployment, good performance
- **Vercel**: Great for serverless
- **Heroku**: Traditional hosting, reliable

Choose Railway if you want the simplest setup! 🚄