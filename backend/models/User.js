const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  spotifyConnected: {
    type: Boolean,
    default: false
  },
  spotifyTokens: {
    accessToken: String,
    refreshToken: String,
    expiresAt: Date
  },
  preferences: {
    defaultMoodCategories: [String],
    playlistLength: {
      type: Number,
      default: 20
    },
    explicitContent: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);