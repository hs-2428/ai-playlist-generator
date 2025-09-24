# 🎵 AI Playlist Generator

A full-stack application that generates personalized music playlists using AI mood analysis and the Spotify API. Built with React, Node.js, Express, MongoDB, Clerk authentication, and Gemini AI.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:3000)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)](https://clerk.dev/)

## ✨ Features

### 🤖 **AI-Powered Mood Analysis**
- **Gemini AI Integration**: Advanced natural language processing to understand complex mood descriptions
- **Smart Playlist Curation**: AI analyzes your mood and selects the perfect tracks
- **Contextual Recommendations**: AI explains why each song fits your vibe

### 🎧 **Music Streaming & Discovery**
- **Spotify Integration**: Access to millions of tracks from Spotify's catalog
- **30-Second Previews**: Listen to track previews directly in the app
- **Audio Controls**: Play, pause, volume control for seamless listening
- **High-Quality Metadata**: Artist, album, duration, and artwork for each track

### 🎨 **Modern Dark Mode Interface**
- **Complete Dark Theme**: Beautiful dark mode across the entire application
- **Glassmorphism Design**: Modern UI with backdrop blur effects
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished interactions and loading states

### 🔐 **Secure Authentication**
- **Clerk Integration**: Enterprise-grade authentication and user management
- **Dark Mode Auth**: Custom-styled login and signup pages matching the app theme
- **User Profiles**: Personalized experience with user avatars and settings
- **Database**: MongoDB for persistent storage
- **Styling**: Tailwind CSS for responsive UI

## Features
- Natural language mood input processing
- AI-powered mood interpretation
- Spotify playlist generation
- User authentication and profiles
- Persistent playlist history
- Collaborative playlist sharing
- Responsive design for all devices

## Project Structure
- `/frontend` - React.js application
- `/backend` - Node.js/Express API server
- `/shared` - Shared utilities and types

## Setup Instructions

### Prerequisites
1. Node.js (v18 or later)
2. npm or yarn
3. Git

### API Keys Required
You'll need to obtain the following API keys:

#### Spotify API
1. Go to https://developer.spotify.com/dashboard
2. Create a new app
3. Get your Client ID and Client Secret
4. Add redirect URI: `http://localhost:3000/callback`

#### Google Gemini AI API
1. Go to https://ai.google.dev/
2. Get API key from Google AI Studio
3. Enable Gemini Pro API

#### Clerk Authentication
1. Go to https://clerk.com/
2. Create a new application
3. Get your publishable key and secret key

### Environment Variables
Create `.env` files in both frontend and backend directories with your API keys.

### Installation
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory, new terminal)
npm start
```

## 🚀 Quick Deploy to GitHub Pages

**Easiest deployment option for beginners!**

### Frontend (GitHub Pages) + Backend (Free Platform)

1. **Deploy Frontend to GitHub Pages:**
```bash
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

2. **Deploy Backend (choose one free option):**
   - **Railway**: Connect GitHub repo → Deploy automatically
   - **Render**: Connect GitHub → Create Web Service → Deploy  
   - **Fly.io**: `fly launch` → Deploy

3. **Update Production Config:**
```bash
# Edit frontend/.env.production
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

4. **Redeploy Frontend:**
```bash
cd frontend && npm run deploy
```

**🎯 Result**: Frontend at `https://hs-2428.github.io/ai-playlist-generator`

---

## 🚀 Deployment Options
- Frontend: Vercel or Netlify
- Backend: Vercel, Railway, or Heroku
- Database: MongoDB Atlas

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request