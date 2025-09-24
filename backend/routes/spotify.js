const express = require('express');
const axios = require('axios');
const clerkMiddleware = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get Spotify access token
const getSpotifyToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', 
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      }
    }
  );
  return response.data.access_token;
};

// Search for tracks based on mood/genre
router.post('/search', clerkMiddleware, async (req, res) => {
  try {
    const { query, limit = 20, genres = [] } = req.body;
    
    const token = await getSpotifyToken();
    
    let searchQuery = query;
    if (genres.length > 0) {
      searchQuery += ` genre:${genres.join(' genre:')}`;
    }
    
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        q: searchQuery,
        type: 'track',
        limit,
        market: 'US'
      }
    });
    
    const tracks = response.data.tracks.items.map(track => ({
      spotifyId: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: track.duration_ms,
      imageUrl: track.album.images[0]?.url,
      previewUrl: track.preview_url
    }));
    
    res.json({ tracks });
  } catch (error) {
    console.error('Spotify search error:', error);
    res.status(500).json({ error: 'Failed to search Spotify' });
  }
});

// Get recommendations based on seed tracks/genres
router.post('/recommendations', clerkMiddleware, async (req, res) => {
  try {
    const { seedTracks = [], seedGenres = [], limit = 20, audioFeatures = {} } = req.body;
    
    const token = await getSpotifyToken();
    
    const params = {
      limit,
      market: 'US'
    };
    
    if (seedTracks.length > 0) params.seed_tracks = seedTracks.slice(0, 5).join(',');
    if (seedGenres.length > 0) params.seed_genres = seedGenres.slice(0, 5).join(',');
    
    // Add audio features if provided
    Object.keys(audioFeatures).forEach(key => {
      if (audioFeatures[key] !== undefined) {
        params[`target_${key}`] = audioFeatures[key];
      }
    });
    
    const response = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params
    });
    
    const tracks = response.data.tracks.map(track => ({
      spotifyId: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: track.duration_ms,
      imageUrl: track.album.images[0]?.url,
      previewUrl: track.preview_url
    }));
    
    res.json({ tracks });
  } catch (error) {
    console.error('Spotify recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get available genres
router.get('/genres', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    
    const response = await axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    res.json({ genres: response.data.genres });
  } catch (error) {
    console.error('Spotify genres error:', error);
    res.status(500).json({ error: 'Failed to get genres' });
  }
});

module.exports = router;