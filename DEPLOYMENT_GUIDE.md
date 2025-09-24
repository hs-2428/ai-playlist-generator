# 🚀 Deployment Guide - AI Playlist Generator

This guide covers multiple deployment options for the AI Playlist Generator, from local development to production cloud deployment.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] All environment variables configured
- [ ] API keys for Spotify, Gemini AI, Clerk, and MongoDB
- [ ] Both frontend and backend tested locally
- [ ] Database connection verified
- [ ] Authentication working properly

## 🌐 Deployment Options

### 1. GitHub Pages + External Backend (Recommended for Free)

**Perfect for beginners and free hosting!**

#### Frontend on GitHub Pages:
```bash
cd frontend
npm install --save-dev gh-pages
npm run deploy
```

#### Backend Options (choose one):
- **Railway** (recommended): Free tier, easy GitHub integration
- **Render**: Free tier with automatic deployments  
- **Fly.io**: Free tier with great performance

**Quick Setup:**
```bash
./deploy-github-pages.sh
```

---

### 2. Local Development Deployment

**Backend (Port 5000):**
```bash
cd backend
node server.js
```

**Frontend (Port 3000):**
```bash
cd frontend
npm start
```

**Access:** http://localhost:3000

---

### 2. Production Deployment on Vercel (Recommended)

Vercel offers excellent integration with GitHub and automatic deployments.

#### Frontend Deployment on Vercel:

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy Frontend:**
```bash
cd frontend
vercel
```

4. **Configure Environment Variables in Vercel Dashboard:**
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add:
     - `REACT_APP_CLERK_PUBLISHABLE_KEY`
     - `REACT_APP_API_BASE_URL` (your backend URL)

#### Backend Deployment on Vercel:

1. **Create vercel.json in backend directory:**
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

2. **Deploy Backend:**
```bash
cd backend
vercel
```

3. **Configure Environment Variables:**
   - Add all backend environment variables in Vercel dashboard

---

### 3. Deployment on Netlify + Heroku

#### Frontend on Netlify:

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository for automatic deployments

3. **Configure Environment Variables:**
   - In Netlify dashboard: Site settings > Environment variables

#### Backend on Heroku:

1. **Install Heroku CLI and login:**
```bash
heroku login
```

2. **Create Heroku app:**
```bash
cd backend
heroku create your-app-name
```

3. **Configure Environment Variables:**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set SPOTIFY_CLIENT_ID=your_client_id
heroku config:set SPOTIFY_CLIENT_SECRET=your_client_secret
heroku config:set GEMINI_API_KEY=your_gemini_key
heroku config:set CLERK_SECRET_KEY=your_clerk_secret
```

4. **Deploy:**
```bash
git push heroku main
```

---

### 4. Docker Deployment

#### Create Dockerfiles:

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Frontend Dockerfile:**
```dockerfile
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
```

#### Docker Compose:

**docker-compose.yml:**
```yaml
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
```

**Deploy with Docker:**
```bash
docker-compose up -d
```

---

### 5. AWS Deployment

#### Using AWS Amplify (Frontend) + AWS Lambda (Backend):

1. **Install AWS Amplify CLI:**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify in frontend:**
```bash
cd frontend
amplify init
```

3. **Deploy frontend:**
```bash
amplify publish
```

4. **Deploy backend as Lambda functions:**
   - Use AWS Serverless Application Model (SAM)
   - Configure API Gateway for REST endpoints

---

## 🔧 Environment Configuration for Production

### Frontend Environment Variables:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_key
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

### Backend Environment Variables:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-playlist-generator
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=sk_live_your_clerk_secret
PORT=5000
CORS_ORIGIN=https://your-frontend-url.com
NODE_ENV=production
```

## 🚨 Production Considerations

### Security:
- Use HTTPS in production
- Set proper CORS origins
- Enable rate limiting
- Use environment variables for all secrets
- Regular security updates

### Performance:
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Monitor database performance
- Set up error tracking (Sentry, etc.)

### Monitoring:
- Application logs
- Database metrics
- API response times
- User analytics
- Error tracking

## 📊 Recommended Production Stack

**Best Performance & Reliability:**
- **Frontend:** Vercel (with GitHub integration)
- **Backend:** Vercel Serverless Functions or Railway
- **Database:** MongoDB Atlas
- **Authentication:** Clerk
- **Monitoring:** Vercel Analytics + Sentry
- **DNS/CDN:** Cloudflare

**Cost-Effective:**
- **Frontend:** Netlify
- **Backend:** Railway or Render
- **Database:** MongoDB Atlas (Free tier)
- **Authentication:** Clerk (Free tier)

## 🔄 CI/CD Setup

### GitHub Actions (Recommended):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install and Build
        run: |
          cd frontend
          npm ci
          npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Deploy Backend
        run: |
          cd backend
          npm ci
          # Deploy to your chosen platform
```

## 📱 Mobile App Deployment (Future)

For React Native version:
- **iOS:** App Store Connect
- **Android:** Google Play Console
- **Cross-platform:** Expo Application Services (EAS)

---

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors:** Update CORS_ORIGIN in backend
2. **API Key Issues:** Verify all environment variables
3. **Build Failures:** Check Node.js version compatibility
4. **Database Connection:** Whitelist deployment server IPs in MongoDB Atlas

### Support:
- Check deployment platform docs
- Review application logs
- Verify environment variables
- Test API endpoints individually

---

**🎉 Your AI Playlist Generator is now ready for production deployment!**