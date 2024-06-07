// Initialize the dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

// Initialize Express
const app = express();

// Set Up Middleware
// Parse incoming request with JSON
app.use(bodyParser.json());
// Enable CORS requests
app.use(cors());

// Setting the MongoDB Connection
const mongoURI = 'mongodb+srv://josephcruel:RPsgRovde6Y43cAR@notescluster.pdmqjze.mongodb.net/';
mongoose.connect(mongoURI);

const db = mongoose.connection;
// Loggging mongodb connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Logging mongodb connection successful
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Setting Routes

// Import and use the notes route handler
const notes = require('./backend/routes/notes');
app.use('/api/notes', notes);

// Serve static files for adding a note
app.use('/addnote', express.static(path.join(__dirname, 'frontend/src/pages/addnote')));
// Server static files for the home page
app.use('/home', express.static(path.join(__dirname, 'frontend/src/pages/home')));

// Default route
app.get('/', (req, res) => {
    res.redirect('/home/home.html');
});


// Set up port 3000 for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
