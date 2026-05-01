const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  inputText: {
    type: String,
    required: true
  },
  scores: {
    safety:      { type: Number, required: true },
    helpfulness: { type: Number, required: true },
    factuality:  { type: Number, required: true },
    calibration: { type: Number, required: true },
    overall:     { type: Number, required: true }
  },
  reasoning: {
    safety:      { type: String },
    helpfulness: { type: String },
    factuality:  { type: String },
    calibration: { type: String }
  },
  summary: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);