const express = require('express');
const axios = require('axios');
const clerkMiddleware = require('../middleware/auth');
const router = express.Router();

// Analyze mood and generate search parameters
router.post('/analyze-mood', clerkMiddleware, async (req, res) => {
  try {
    const { moodPrompt } = req.body;
    
    if (!moodPrompt) {
      return res.status(400).json({ error: 'Mood prompt is required' });
    }
    
    const prompt = `
    You are a music mood analyzer. Analyze the following mood description and provide JSON response with music parameters:
    
    Mood: "${moodPrompt}"
    
    Please respond with a JSON object containing:
    {
      "genres": ["genre1", "genre2", "genre3"], // 1-3 spotify genres that match the mood
      "audioFeatures": {
        "energy": 0.7, // 0-1 scale
        "valence": 0.8, // 0-1 scale (positivity)
        "danceability": 0.6, // 0-1 scale
        "tempo": 120 // BPM, optional
      },
      "searchTerms": ["keyword1", "keyword2"], // Additional search keywords
      "playlistName": "Generated playlist name",
      "description": "Brief description of the mood and playlist"
    }
    
    Only respond with valid JSON, no additional text.
    `;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const musicParams = JSON.parse(jsonMatch[0]);
    
    res.json({
      moodAnalysis: musicParams,
      originalPrompt: moodPrompt
    });
    
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze mood',
      details: error.message 
    });
  }
});

// Generate playlist description
router.post('/generate-description', clerkMiddleware, async (req, res) => {
  try {
    const { moodPrompt, tracks } = req.body;
    
    const trackList = tracks.map(track => `${track.name} by ${track.artist}`).join(', ');
    
    const prompt = `
    Create a creative and engaging playlist description for a mood-based playlist.
    
    Original mood prompt: "${moodPrompt}"
    Sample tracks: ${trackList.substring(0, 200)}...
    
    Write a 2-3 sentence description that captures the mood and vibe of this playlist.
    Make it engaging and personal, as if you're describing it to a friend.
    `;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const description = response.data.candidates[0].content.parts[0].text.trim();
    
    res.json({ description });
    
  } catch (error) {
    console.error('Gemini description error:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
});

module.exports = router;