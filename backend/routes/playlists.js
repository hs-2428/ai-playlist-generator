const express = require('express');
const clerkMiddleware = require('../middleware/auth');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const router = express.Router();

// Create a new playlist
router.post('/', clerkMiddleware, async (req, res) => {
  try {
    const { userId } = req.auth;
    const { name, description, moodPrompt, tracks, tags = [] } = req.body;
    
    const playlist = new Playlist({
      name,
      description,
      moodPrompt,
      userId,
      tracks,
      tags
    });
    
    await playlist.save();
    res.status(201).json({ message: 'Playlist created successfully', playlist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Get user's playlists
router.get('/my-playlists', clerkMiddleware, async (req, res) => {
  try {
    const { userId } = req.auth;
    const { page = 1, limit = 10 } = req.query;
    
    const playlists = await Playlist.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Playlist.countDocuments({ userId });
    
    res.json({
      playlists,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Get public playlists
router.get('/public', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    
    const filter = { isPublic: true };
    if (tag) filter.tags = tag;
    
    const playlists = await Playlist.find(filter)
      .sort({ likes: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username');
    
    const total = await Playlist.countDocuments(filter);
    
    res.json({
      playlists,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching public playlists:', error);
    res.status(500).json({ error: 'Failed to fetch public playlists' });
  }
});

// Get playlist by ID
router.get('/:id', clerkMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    // Check access permissions
    const hasAccess = playlist.userId === userId || 
                     playlist.isPublic || 
                     playlist.collaborators.some(c => c.userId === userId);
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(playlist);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

// Update playlist
router.put('/:id', clerkMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    const updates = req.body;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    // Check edit permissions
    const canEdit = playlist.userId === userId || 
                   playlist.collaborators.some(c => c.userId === userId && ['edit', 'admin'].includes(c.permissions));
    
    if (!canEdit) {
      return res.status(403).json({ error: 'Edit permission denied' });
    }
    
    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Playlist updated successfully', playlist: updatedPlaylist });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ error: 'Failed to update playlist' });
  }
});

// Add collaborator to playlist
router.post('/:id/collaborators', clerkMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    const { collaboratorId, permissions = 'view' } = req.body;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    if (playlist.userId !== userId) {
      return res.status(403).json({ error: 'Only playlist owner can add collaborators' });
    }
    
    // Get collaborator user info
    const collaborator = await User.findOne({ clerkId: collaboratorId });
    if (!collaborator) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if already a collaborator
    const existingCollaborator = playlist.collaborators.find(c => c.userId === collaboratorId);
    if (existingCollaborator) {
      return res.status(400).json({ error: 'User is already a collaborator' });
    }
    
    playlist.collaborators.push({
      userId: collaboratorId,
      username: collaborator.username,
      permissions
    });
    
    await playlist.save();
    res.json({ message: 'Collaborator added successfully', playlist });
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ error: 'Failed to add collaborator' });
  }
});

// Like/unlike playlist
router.post('/:id/like', clerkMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    const hasLiked = playlist.likedBy.includes(userId);
    
    if (hasLiked) {
      // Unlike
      playlist.likedBy = playlist.likedBy.filter(id => id !== userId);
      playlist.likes = Math.max(0, playlist.likes - 1);
    } else {
      // Like
      playlist.likedBy.push(userId);
      playlist.likes += 1;
    }
    
    await playlist.save();
    res.json({ 
      message: hasLiked ? 'Playlist unliked' : 'Playlist liked',
      liked: !hasLiked,
      likes: playlist.likes
    });
  } catch (error) {
    console.error('Error liking playlist:', error);
    res.status(500).json({ error: 'Failed to like playlist' });
  }
});

// Delete playlist
router.delete('/:id', clerkMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }
    
    if (playlist.userId !== userId) {
      return res.status(403).json({ error: 'Only playlist owner can delete' });
    }
    
    await Playlist.findByIdAndDelete(id);
    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
});

module.exports = router;