const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// Get chat history
router.get('/:userId/:conversationId', async (req, res) => {
  try {
    const { userId, conversationId } = req.params;
    const messages = await ChatMessage.find({
      userId,
      conversationId,
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message to chatbot
router.post('/message', async (req, res) => {
  try {
    const { userId, conversationId, message } = req.body;

    // Save user message
    const userMessage = new ChatMessage({
      userId,
      conversationId,
      message,
      sender: 'user',
    });

    await userMessage.save();

    // Generate bot response (placeholder - replace with actual AI integration)
    const botResponse = await generateBotResponse(message);

    // Save bot message
    const botMessage = new ChatMessage({
      userId,
      conversationId,
      message: botResponse,
      sender: 'bot',
    });

    await botMessage.save();

    res.json({
      userMessage,
      botMessage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate bot response (placeholder)
async function generateBotResponse(userMessage) {
  const responses = {
    fever: 'High fever can be serious. Stay hydrated, take rest, and monitor your temperature. If fever persists for more than 3 days or exceeds 103°F (39.4°C), please consult a healthcare professional immediately.',
    cough: 'A persistent cough may indicate various conditions. Drink warm liquids, use honey, and get plenty of rest. If the cough lasts more than 2 weeks or you cough up blood, seek medical advice.',
    sprain: 'For a sprain, remember RICE: Rest, Ice (15-20 mins), Compression, and Elevation. Avoid putting weight on the injured area. If pain or swelling persists, consult a doctor.',
    headache: 'For a headache, rest in a quiet, dark room, stay hydrated, and try relaxation techniques. If headaches are severe or frequent, please consult a healthcare professional.',
    default: 'Thank you for your message. I\'m here to help. Could you provide more details about your symptoms? Remember, I provide general health information and you should consult a healthcare professional for diagnosis.',
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return responses.default;
}

// Start new conversation
router.post('/conversation/start', async (req, res) => {
  try {
    const { userId } = req.body;
    const conversationId = `conv-${Date.now()}`;

    const initialMessage = new ChatMessage({
      userId,
      conversationId,
      message: 'Hello! I\'m HealBuddy AI Assistant. How can I help you today? Please describe your symptoms or health concerns.',
      sender: 'bot',
    });

    await initialMessage.save();

    res.json({ conversationId, initialMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
