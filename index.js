const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

const Review = require('./models/review');

const MONGO_URI = 'mongodb+srv://user:4G1vpqwHWZZPfUxZ@game-reviews.zyyxx2f.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Failed to connect to MongoDB", error);
});

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/reviews', async (req, res) => {
  const newReview = new Review({
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use(cors());
app.use(express.json());

// ... (server start code)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

