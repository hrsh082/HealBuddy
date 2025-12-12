const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    symptomName: {
      type: String,
      required: true,
      enum: [
        'Fever',
        'Cough',
        'Sprain',
        'Headache',
        'Nausea',
        'Vomiting',
        'Rash',
        'Chills',
        'Fatigue',
        'Body Ache',
      ],
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe'],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    affectedArea: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    additionalSymptoms: [String],
    status: {
      type: String,
      enum: ['Active', 'Resolved', 'Monitoring'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Symptom', symptomSchema);
