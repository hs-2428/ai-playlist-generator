# AI Mood-Based Playlist Generator

This is a full-stack web application that generates personalized playlists based on mood descriptions using AI.

## Tech Stack
- **Frontend**: React.js with responsive design
- **Backend**: Node.js/Express
- **AI Integration**: Google Gemini AI for mood interpretation
- **Music API**: Spotify Web API for playlist generation
- **Authentication**: Clerk for user management
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

## Deployment
- Frontend: Vercel or Netlify
- Backend: Vercel, Railway, or Heroku
- Database: MongoDB Atlas

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request