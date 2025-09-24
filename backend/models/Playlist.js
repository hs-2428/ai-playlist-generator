const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  moodPrompt: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  tracks: [{
    spotifyId: String,
    name: String,
    artist: String,
    album: String,
    duration: Number,
    imageUrl: String,
    previewUrl: String
  }],
  spotifyPlaylistId: {
    type: String,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isCollaborative: {
    type: Boolean,
    default: false
  },
  collaborators: [{
    userId: String,
    username: String,
    permissions: {
      type: String,
      enum: ['view', 'edit', 'admin'],
      default: 'view'
    }
  }],
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [String]
}, {
  timestamps: true
});

// Index for efficient querying
playlistSchema.index({ userId: 1, createdAt: -1 });
playlistSchema.index({ isPublic: 1, likes: -1 });
playlistSchema.index({ tags: 1 });

module.exports = mongoose.model('Playlist', playlistSchema);