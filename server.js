const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();

// Set Up Middleware
app.use(bodyParser.json());
app.use(cors());

// Setting the MongoDB Connection
const mongoURI = 'mongodb+srv://josephcruel:RPsgRovde6Y43cAR@notescluster.pdmqjze.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Setting Routes
const notes = require('./routes/notes');
app.use('/api/notes', notes);

// Set up port 3000 for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
