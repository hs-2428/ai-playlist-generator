# 🎵 AI Playlist Generator

## 🚀 **[✨ Try the Live App →](https://aiplaygen-harsh-2024.surge.sh)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Surge.sh-brightgreen)](https://aiplaygen-harsh-2024.surge.sh)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An intelligent music playlist generator powered by AI that creates personalized playlists based on your mood, preferences, and listening context. Experience the perfect blend of artificial intelligence and music discovery.

![AI Playlist Generator Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=🎵+AI+Playlist+Generator)

## ✨ Features

### 🤖 **AI-Powered Intelligence**
- **Smart Playlist Generation** - Uses Google Gemini AI to understand your mood and preferences
- **Context-Aware Recommendations** - Considers time of day, weather, and personal taste
- **Natural Language Processing** - Describe your mood in plain English

### 🎵 **Music Experience**
- **Spotify Integration** - Access millions of tracks with 30-second previews
- **Audio Player** - Built-in player with controls (play, pause, skip)
- **High-Quality Previews** - Crystal clear audio streaming
- **Track Information** - Artist names, album details, and release dates

### 🎨 **User Interface**
- **🌙 Dark Mode** - Sleek dark theme optimized for music listening
- **📱 Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **⚡ Fast Performance** - Optimized loading with lazy components
- **🎭 Smooth Animations** - Engaging transitions and interactions

### 🔐 **Security & Authentication**
- **Clerk Authentication** - Secure user accounts with social login options
- **Dark Theme Auth** - Consistent dark mode even in login/signup flows
- **Session Management** - Secure user sessions with automatic refresh
- **Privacy First** - Your data stays secure and private

### 💾 **Data Management**
- **MongoDB Integration** - Reliable playlist storage and retrieval
- **User Profiles** - Personalized experience with saved preferences
- **Playlist History** - Access your previously generated playlists
- **Cloud Sync** - Access your playlists from any device

## 🚀 Live Deployments

| Platform | URL | Status |
|----------|-----|--------|
| **Frontend** | [🔗 Surge.sh](https://aiplaygen-harsh-2024.surge.sh) | ✅ Active |
| **Backend API** | [🔗 Render](https://ai-playlist-generator-la8z.onrender.com) | ✅ Active |

## 🛠️ Technology Stack

### Frontend
```
React.js 18.x         - Modern UI framework
Custom CSS           - Responsive design with CSS variables
Clerk Authentication - Secure user management
Axios                - HTTP client for API calls
React Router Dom     - Client-side routing
Lucide React         - Beautiful icons
Font Awesome         - Additional icon library
```

### Backend
```
Node.js 18.x         - JavaScript runtime
Express.js           - Web application framework
MongoDB Atlas        - Cloud database service
Mongoose             - MongoDB object modeling
Clerk SDK            - Server-side authentication
Helmet              - Security middleware
Rate Limiting       - API protection
Joi                 - Data validation
```

### AI & Music APIs
```
Google Gemini AI    - Intelligent playlist generation
Spotify Web API     - Music catalog and previews
```

### DevOps & Deployment
```
GitHub Actions      - CI/CD pipeline
Surge.sh           - Frontend deployment
Render             - Backend deployment
npm                - Package management
```

## 🎯 How It Works

### 1. **🔐 Authentication Flow**
```
User Registration → Clerk Authentication → Dark Theme Login → User Dashboard
```

### 2. **🎵 Playlist Generation Process**
```
Mood Description → Gemini AI Processing → Spotify Track Search → Playlist Creation → Audio Preview
```

### 3. **📱 User Experience Journey**
```
Landing Page → Sign Up/Login → Mood Input → AI Generation → Music Preview → Save Playlist
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB Atlas account
- Spotify Developer account
- Google AI Studio account
- Clerk account

### Environment Variables

Create `.env` files in both `frontend` and `backend` directories:

**Frontend (.env)**
```bash
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
REACT_APP_BACKEND_URL=https://ai-playlist-backend-q3gw.onrender.com
```

**Backend (.env)**
```bash
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_atlas_uri
GEMINI_API_KEY=your_gemini_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
PORT=5000
CORS_ORIGIN=https://aiplaygen-harsh-2024.surge.sh
```

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/hs-2428/ai-playlist-generator.git
cd ai-playlist-generator

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Start development servers
npm run dev    # Backend on port 5000
cd ../frontend
npm start      # Frontend on port 3000
```

## 📚 API Documentation

### Playlist Generation Endpoint
```http
POST /api/generate-playlist
Content-Type: application/json
Authorization: Bearer <clerk-session-token>

{
  "query": "upbeat songs for morning workout",
  "count": 10
}
```

### Health Check
```http
GET /api/health
```

## 🎨 Screenshots

### Dark Mode Interface
![Dark Mode](https://via.placeholder.com/400x300/1a1a1a/ffffff?text=🌙+Dark+Mode)

### Playlist Generation
![Playlist Generation](https://via.placeholder.com/400x300/1a1a1a/ffffff?text=🎵+AI+Generation)

### Music Player
![Music Player](https://via.placeholder.com/400x300/1a1a1a/ffffff?text=🔊+Audio+Player)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Project Statistics

- **Lines of Code**: 5,000+
- **Components**: 15+ React components
- **API Endpoints**: 10+ backend routes
- **Dependencies**: 25+ npm packages
- **Build Size**: ~103KB (optimized)

## 🐛 Issues & Troubleshooting

Common issues and solutions are documented in [PROJECT_ISSUES_AND_SOLUTIONS.md](./PROJECT_ISSUES_AND_SOLUTIONS.md)

## 🔮 Future Enhancements

- [ ] **Machine Learning** - User preference learning
- [ ] **Social Features** - Playlist sharing and collaboration
- [ ] **Offline Mode** - Download playlists for offline listening
- [ ] **Voice Control** - Voice commands for music control
- [ ] **Smart Notifications** - Mood-based playlist suggestions

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For intelligent playlist generation
- **Spotify** - For comprehensive music catalog
- **Clerk** - For seamless authentication
- **MongoDB** - For reliable data storage
- **React Community** - For amazing framework and ecosystem

## 📞 Contact

**Developer**: Harsh Sharma  
**GitHub**: [@hs-2428](https://github.com/hs-2428)  
**Project Link**: [AI Playlist Generator](https://github.com/hs-2428/ai-playlist-generator)

---

<div align="center">

**🎵 Built with ❤️ and lots of ☕**

[![GitHub stars](https://img.shields.io/github/stars/hs-2428/ai-playlist-generator?style=social)](https://github.com/hs-2428/ai-playlist-generator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/hs-2428/ai-playlist-generator?style=social)](https://github.com/hs-2428/ai-playlist-generator/network)

</div>