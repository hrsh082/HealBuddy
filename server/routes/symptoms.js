const express = require('express');
const router = express.Router();
const Symptom = require('../models/Symptom');

// Get all symptoms for a patient
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const symptoms = await Symptom.find({ userId }).sort({ createdAt: -1 });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new symptom
router.post('/', async (req, res) => {
  try {
    const { userId, symptomName, severity, duration, description, affectedArea, startDate } = req.body;

    const symptom = new Symptom({
      userId,
      symptomName,
      severity,
      duration,
      description,
      affectedArea,
      startDate,
    });

    await symptom.save();
    res.status(201).json({ message: 'Symptom recorded successfully', symptom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get symptom details
router.get('/:userId/:symptomId', async (req, res) => {
  try {
    const { symptomId } = req.params;
    const symptom = await Symptom.findById(symptomId);

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    res.json(symptom);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update symptom status
router.put('/:symptomId', async (req, res) => {
  try {
    const { symptomId } = req.params;
    const { status, severity } = req.body;

    const symptom = await Symptom.findByIdAndUpdate(
      symptomId,
      { status, severity },
      { new: true }
    );

    res.json({ message: 'Symptom updated successfully', symptom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get quick solution recommendations based on symptom
router.post('/:symptomId/solutions', async (req, res) => {
  try {
    const { symptomId } = req.params;
    const symptom = await Symptom.findById(symptomId);

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }

    // Placeholder for AI-based solution generation
    const solutions = {
      Fever: [
        'Stay hydrated - drink water, coconut water, or herbal tea',
        'Rest as much as possible',
        'Use paracetamol or ibuprofen as recommended',
        'Apply cool compress to forehead',
        'Monitor temperature regularly',
        'Consult doctor if fever persists beyond 3 days',
      ],
      Cough: [
        'Stay hydrated',
        'Use honey (1 tsp for adults)',
        'Try steam inhalation',
        'Avoid irritants like smoke and dust',
        'Use cough drops or lozenges',
        'Consult doctor if cough persists for more than 2 weeks',
      ],
      Sprain: [
        'Rest - avoid activities that put weight on the sprain',
        'Ice - apply ice for 15-20 minutes, several times a day',
        'Compression - wrap the area with an elastic bandage',
        'Elevation - raise the injured area above heart level',
        'Pain relief - take over-the-counter pain medication',
        'Physical therapy exercises once acute pain subsides',
      ],
      Headache: [
        'Rest in a quiet, dark room',
        'Apply a warm or cold compress',
        'Stay hydrated',
        'Take pain relief medication (paracetamol/ibuprofen)',
        'Practice relaxation techniques',
        'Avoid caffeine and alcohol',
      ],
    };

    const recommendations = solutions[symptom.symptomName] || [
      'Consult a healthcare professional for proper diagnosis',
      'Monitor your symptoms closely',
      'Maintain good hygiene',
    ];

    res.json({
      symptom: symptom.symptomName,
      immediateAid: recommendations,
      nextSteps: 'If symptoms persist, please consult a healthcare professional',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
