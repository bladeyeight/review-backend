const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  content: String,
  rating: Number,
  // Add other fields as required
});

module.exports = mongoose.model('Review', reviewSchema);
