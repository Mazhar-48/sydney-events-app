const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // This allows the React app to talk to this server
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mazharkhan983955:Apple1234@cluster0.ltxig.mongodb.net/sydney_events?appName=Cluster0')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define the Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    city: String,
    status: String,
    last_scraped: Date,
    source_url: String
});

const Event = mongoose.model('Event', eventSchema);

// API Route
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));