const express = require('express');
const router = express.Router();
const { evaluateText } = require('../services/claudeService');
const Evaluation = require('../models/Evaluation');

// POST /api/evaluate
// Receives text, evaluates it, saves to MongoDB, returns result
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'No text provided' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ message: 'Text too long. Max 5000 characters.' });
    }

    // Call Claude API
    const evaluation = await evaluateText(text);

    // Save to MongoDB
    const saved = await Evaluation.create({
      inputText: text,
      scores: {
        safety:      evaluation.safety,
        helpfulness: evaluation.helpfulness,
        factuality:  evaluation.factuality,
        calibration: evaluation.calibration,
        overall:     evaluation.overall
      },
      reasoning:  evaluation.reasoning,
      summary:    evaluation.summary
    });

    // Return the result
    res.status(201).json({
      id:        saved._id,
      scores:    saved.scores,
      reasoning: saved.reasoning,
      summary:   saved.summary,
      createdAt: saved.createdAt
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(500).json({ message: 'Evaluation failed', error: error.message });
  }
});

// GET /api/evaluate/history
// Returns all past evaluations
router.get('/history', async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('scores summary createdAt inputText');

    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;