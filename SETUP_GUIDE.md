# 🎵 AI Playlist Generator - Setup Guide

## 🎉 **Current Status: SERVERS RUNNING SUCCESSFULLY!**

✅ **Frontend**: http://localhost:3000 (Compiled successfully)  
✅ **Backend**: http://localhost:5000 (Environment loaded correctly)  
✅ **Git Repository**: Initialized with comprehensive commit  

---

## 📋 **Next Steps for Full Functionality**

### 1. **Install MongoDB** (Required for backend database)

**Option A: MongoDB Local Installation**
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb/brew/mongodb-community@7.0
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Update `backend/.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moodtunes`

### 2. **Configure API Keys** (Required for full functionality)

**Backend Environment Variables** (`backend/.env`):
```env
# Get from https://dashboard.clerk.com
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Get from https://developer.spotify.com/dashboard
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Get from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend Environment Variables** (`frontend/.env`):
```env
# Get from https://dashboard.clerk.com (different from backend key)
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. **Start Both Servers**

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
# Opens http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

---

## 🛠 **API Key Setup Instructions**

### **Clerk Authentication Setup**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create new application
3. Choose authentication methods (email, Google, etc.)
4. Copy **Publishable Key** → `frontend/.env`
5. Copy **Secret Key** → `backend/.env`

### **Spotify API Setup**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create new app
3. Add redirect URI: `http://localhost:3000/callback`
4. Copy **Client ID** and **Client Secret** → `backend/.env`

### **Google Gemini AI Setup**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy key → `backend/.env`

---

## 🚀 **Deployment Options**

### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Deploy backend (as separate service)
cd ../backend  
vercel
```

### **Option 2: Netlify**
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Netlify (drag & drop build folder)
# Backend: Deploy to Railway, Render, or Heroku
```

---

## 📁 **Project Structure**
```
aiplaygen/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── pages/           # All main pages (Home, Generate, etc.)
│   │   ├── components/      # Reusable UI components  
│   │   └── index.css        # Custom utility classes (replaces Tailwind)
│   └── .env                 # Frontend environment variables
├── backend/                  # Node.js/Express backend
│   ├── routes/              # API endpoints
│   ├── models/              # MongoDB schemas
│   ├── config/              # Database configuration
│   └── .env                 # Backend environment variables  
├── PROJECT_ISSUES_AND_SOLUTIONS.md  # Comprehensive troubleshooting log
└── README.md                # This setup guide
```

---

## 🔧 **Troubleshooting**

### **If Frontend Won't Start:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### **If Backend MongoDB Error:**
- Install MongoDB locally OR use MongoDB Atlas
- Verify `MONGODB_URI` in `backend/.env`
- Check MongoDB service is running

### **If Authentication Issues:**
- Verify Clerk API keys are correct
- Check frontend/backend .env files
- Ensure publishable key in frontend, secret key in backend

---

## ✅ **Success Checklist**

- [ ] MongoDB installed/configured
- [ ] All API keys configured in .env files
- [ ] Frontend compiling at http://localhost:3000
- [ ] Backend running at http://localhost:5000 (no MongoDB errors)
- [ ] User can sign up/login with Clerk
- [ ] Playlist generation works with Gemini AI
- [ ] Spotify integration functional

---

**🎯 You're ready to build amazing AI-powered playlists!** 

Need help? Check `PROJECT_ISSUES_AND_SOLUTIONS.md` for detailed troubleshooting.