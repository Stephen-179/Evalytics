const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const evaluateRoute = require('./routes/evaluate');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/evaluate', evaluateRoute);

// Test route — to confirm server is running
app.get('/', (req, res) => {
  res.json({ message: 'Evalytics server is running' });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));