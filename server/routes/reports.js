const express = require('express');
const router = express.Router();
const multer = require('multer');
const Report = require('../models/Report');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reports/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const ext = allowedTypes.test(file.mimetype);
    if (ext) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  },
});

// Get all reports for a patient
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({ userId }).sort({ uploadDate: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload new report
router.post('/upload/:userId', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { reportType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const report = new Report({
      userId,
      fileName: req.file.originalname,
      fileUrl: `/uploads/reports/${req.file.filename}`,
      reportType,
      scanStatus: 'Pending',
    });

    await report.save();

    res.status(201).json({
      message: 'Report uploaded successfully',
      report,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get report details
router.get('/:userId/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Trigger AI report scanning
router.post('/:reportId/scan', async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findByIdAndUpdate(
      reportId,
      { scanStatus: 'Processing' },
      { new: true }
    );

    // Placeholder: In production, this would call an AI service
    setTimeout(async () => {
      await Report.findByIdAndUpdate(reportId, {
        scanStatus: 'Completed',
        aiSummary: 'Report analysis completed. Please review findings below.',
        findings: ['Finding 1', 'Finding 2', 'Finding 3'],
        recommendations: ['Recommendation 1', 'Recommendation 2'],
        confidence: 85,
      });
    }, 3000);

    res.json({ message: 'Report scanning initiated', report });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
