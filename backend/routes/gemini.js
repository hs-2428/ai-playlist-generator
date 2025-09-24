const express = require('express');
const axios = require('axios');
const clerkMiddleware = require('../middleware/auth');
const router = express.Router();

// Analyze mood and generate track recommendations
router.post('/analyze-mood', clerkMiddleware, async (req, res) => {
  try {
    const { moodDescription, genre = 'mixed', count = 20 } = req.body;
    
    if (!moodDescription) {
      return res.status(400).json({ error: 'Mood description is required' });
    }
    
    const prompt = `
You are a music curator AI. Based on the mood description, suggest ${count} specific songs.

Mood: "${moodDescription}"
Genre preference: ${genre}

Please respond with a JSON object containing:
{
  "playlistName": "Creative playlist name based on the mood",
  "description": "Brief description of the playlist",
  "tracks": [
    {
      "title": "Song Title",
      "artist": "Artist Name", 
      "reason": "Why this song fits the mood (1 sentence)"
    }
  ]
}

Focus on popular, well-known songs that match the mood. Include a mix of classic hits and contemporary tracks.
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
    
    const generatedText = response.data.candidates[0].content.parts[0].text.trim();
    console.log('Raw Gemini response:', generatedText);
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const playlistData = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!playlistData.tracks || !Array.isArray(playlistData.tracks)) {
      throw new Error('Invalid response structure from AI');
    }
    
    res.json(playlistData);
    
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze mood',
      details: error.message 
    });
  }
});

module.exports = router;