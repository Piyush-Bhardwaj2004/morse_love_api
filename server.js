require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'morsecode';

let db;

app.use(express.json());
app.use(cors({ origin: '*' }));

async function connectDB() {
  try {
    if (!MONGODB_URI) {
      console.log("⚠️ No MongoDB URI, running without DB");
      return;
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(MONGODB_DB);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

app.get('/api/reviews', async (req, res) => {
  try {
    if (!db) return res.json([]);

    const reviews = await db.collection('reviews')
      .find()
      .sort({ date: -1 })
      .toArray();

    res.json(reviews);
  } catch {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, review } = req.body;

    if (!name || !rating || !review) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newReview = {
      name: name.trim(),
      rating: Number(rating),
      review: review.trim(),
      date: new Date()
    };

    if (db) {
      const result = await db.collection('reviews').insertOne(newReview);
      newReview._id = result.insertedId;
    }

    res.status(201).json(newReview);
  } catch {
    res.status(500).json({ error: "Error saving review" });
  }
});

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

start();
