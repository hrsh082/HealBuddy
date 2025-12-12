import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiLoader, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { aiAPI } from '../services/api';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = () => {
    const chatId = 'chat_' + Date.now();
    setConversationId(chatId);
    
    const initialMessage = {
      id: Date.now().toString(),
      message: 'Hello! I\'m HealBuddy, your personal health assistant. How can I help you today? Feel free to ask about your symptoms, health concerns, or get wellness advice.',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    
    setMessages([initialMessage]);
    
    // Initialize chat history in localStorage
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '{}');
    if (!chatHistory[chatId]) {
      chatHistory[chatId] = [initialMessage];
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get('from');
    if (from === 'symptom') {
      const symptomName = params.get('symptom') || 'Symptom';
      const duration = params.get('duration') || '';
      const severity = params.get('severity') || '';

      const userMessage = {
        id: Date.now().toString() + '_user',
        message: `Recorded ${symptomName} (${severity}, ${duration}). Please assess and guide me.`,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      streamAssessment(symptomName, duration, severity);
    }
  }, [location.search]);

  const streamAssessment = async (symptomName, duration, severity) => {
    try {
      setLoading(true);
      const { data } = await aiAPI.assessSymptoms({
        symptoms: [symptomName],
        duration,
        severity,
      });

      const assessmentText = [
        `Assessment: ${data.primaryCondition || 'General guidance'}`,
        data.possibleConditions && data.possibleConditions.length
          ? `Possible conditions: ${data.possibleConditions.join(', ')}`
          : null,
        data.recommendedActions && data.recommendedActions.length
          ? `Recommended actions: ${data.recommendedActions.join('; ')}`
          : null,
        data.doctorConsultationNeeded
          ? 'Next step: Consider consulting a doctor.'
          : 'Next step: Monitor symptoms and follow the actions provided.'
      ]
        .filter(Boolean)
        .join('\n\n');

      const botMessage = {
        id: Date.now().toString() + `_bot_assess`,
        message: assessmentText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      await new Promise((res) => setTimeout(res, 600));
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + `_bot_err`,
          message: 'Sorry, I could not assess the symptom right now. Please try again.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getBotResponse = (userMessage) => {
    // Simple AI response mapping based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      symptom: 'I understand you\'re experiencing symptoms. Please describe them in detail, including when they started and their severity. You can also visit the Dashboard to log your symptoms for detailed guidance.',
      fever: 'For fever: Stay hydrated, rest, take over-the-counter fever reducers like acetaminophen or ibuprofen, and monitor your temperature. If fever persists beyond 3 days or is very high, consult a doctor.',
      headache: 'For headaches: Try resting in a dark room, staying hydrated, applying a cold or warm compress, or taking over-the-counter pain relievers. If headaches are frequent, see a healthcare provider.',
      cough: 'For cough: Stay hydrated, use throat lozenges, try honey (for adults), use a humidifier, and avoid irritants. If cough persists beyond 3 weeks, consult a doctor.',
      pain: 'For pain: Rest the affected area, apply ice or heat as appropriate, elevate if possible, and take over-the-counter pain relievers. Seek medical help if pain is severe or persistent.',
      medicine: 'Please consult with your doctor or pharmacist before starting any medication. They can recommend the best options for your specific condition.',
      appointment: 'To schedule an appointment, contact your healthcare provider directly or use their patient portal if available.',
      default: 'Thank you for your question. For medical concerns, I recommend consulting with a healthcare professional. In the meantime, you can log your symptoms in the Dashboard for immediate guidance.',
    };
    
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim() || !conversationId) {
      return;
    }

    const userMessageText = inputValue;
    setInputValue('');
    setLoading(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const userMessage = {
        id: Date.now().toString(),
        message: userMessageText,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };

      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: getBotResponse(userMessageText),
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, botResponse]);

      // Save to localStorage
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '{}');
      if (!chatHistory[conversationId]) {
        chatHistory[conversationId] = [];
      }
      chatHistory[conversationId].push(userMessage, botResponse);
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] py-6">
      <div className="max-w-3xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
        <div className="px-3 mb-3">
          <h1 className="text-2xl font-bold text-gray-900">HealBuddy</h1>
          <p className="text-gray-600 text-sm">Professional health guidance powered by AI</p>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-y-auto p-5 space-y-4 mb-3 border border-[var(--border)]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-center text-base font-medium">
                Describe your symptoms or ask a health question.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xl px-5 py-3 rounded-2xl border whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-900 border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl border border-gray-200 flex items-center gap-2">
                <FiLoader className="animate-spin text-blue-600" />
                <span className="text-sm font-medium">HealBuddy is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 px-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message HealBuddy"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            disabled={loading}
          />
          <Link
            to="/upload-report"
            className="px-4 py-3 rounded-2xl font-semibold bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            aria-label="Upload report"
            title="Upload report"
          >
            <FiFileText className="text-lg" />
          </Link>
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-5 py-3 rounded-2xl font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            <FiSend className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
