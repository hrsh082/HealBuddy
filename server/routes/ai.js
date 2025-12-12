const express = require('express');
const router = express.Router();

// AI Report Analysis Endpoint
router.post('/analyze-report/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const { reportType, extractedText } = req.body;

    // Placeholder for AI analysis
    // In production, integrate with services like:
    // - OpenAI GPT-4 Vision for image analysis
    // - Hugging Face models for medical report summarization
    // - Custom ML models for specific medical conditions

    const analysis = {
      reportId,
      status: 'Processing',
      summary: 'AI analysis of your medical report',
      findings: [
        'Finding 1 based on AI analysis',
        'Finding 2 based on AI analysis',
      ],
      recommendations: [
        'Recommendation 1 from AI',
        'Recommendation 2 from AI',
      ],
      riskLevel: 'Low',
      confidence: 87,
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Symptom Assessment Endpoint
router.post('/assess-symptoms', async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    const symptom = Array.isArray(symptoms) && symptoms.length ? symptoms[0] : 'General';

    const conditionsMap = {
      Fever: ['Viral infection', 'Influenza', 'Heat exhaustion'],
      Cough: ['Common cold', 'Bronchitis', 'Allergic rhinitis'],
      Headache: ['Tension headache', 'Migraine', 'Sinusitis'],
      Sprain: ['Ligament strain', 'Soft tissue injury'],
      Nausea: ['Gastroenteritis', 'Food intolerance'],
      Vomiting: ['Gastric irritation', 'Food poisoning'],
      Rash: ['Dermatitis', 'Allergic reaction'],
      Chills: ['Viral illness', 'Anemia'],
      Fatigue: ['Stress', 'Sleep deprivation'],
      'Body Ache': ['Muscle strain', 'Influenza'],
      General: ['Non-specific presentation'],
    };

    const actionsMap = {
      Fever: ['Hydration', 'Rest', 'Paracetamol as directed', 'Monitor temperature'],
      Cough: ['Warm fluids', 'Honey (adults)', 'Humidifier', 'Avoid irritants'],
      Headache: ['Hydration', 'Rest in a dark room', 'Cold/warm compress'],
      Sprain: ['Rest', 'Ice', 'Compression', 'Elevation'],
      Nausea: ['Clear fluids', 'Small bland meals'],
      Vomiting: ['Oral rehydration', 'Avoid heavy meals'],
      Rash: ['Gentle cleansing', 'Avoid triggers'],
      Chills: ['Warmth', 'Hydration'],
      Fatigue: ['Sleep hygiene', 'Balanced nutrition'],
      'Body Ache': ['Rest', 'Gentle stretching'],
      General: ['Hydration', 'Rest'],
    };

    const possibleConditions = conditionsMap[symptom] || conditionsMap.General;
    const recommendedActions = actionsMap[symptom] || actionsMap.General;

    const urgencyLevel = severity === 'Severe' ? 'High' : severity === 'Moderate' ? 'Moderate' : 'Low';
    const longDuration = typeof duration === 'string' && (duration.includes('4 days') || duration.includes('5 days'));
    const doctorConsultationNeeded = severity === 'Severe' || longDuration;

    const assessment = {
      primaryCondition: possibleConditions[0] || 'General guidance',
      possibleConditions,
      urgencyLevel,
      recommendedActions,
      doctorConsultationNeeded,
    };

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
