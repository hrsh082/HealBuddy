const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      enum: ['Blood Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'Other'],
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    aiSummary: {
      type: String,
      required: false,
    },
    findings: [String],
    recommendations: [String],
    scanStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Error'],
      default: 'Pending',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
