const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      enum: ['user', 'bot'],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    sentiment: {
      type: String,
      enum: ['Positive', 'Negative', 'Neutral'],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
