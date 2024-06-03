const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

// Initialize Express
const app = express();

// Set Up Middleware
app.use(bodyParser.json());
app.use(cors());

// Setting the MongoDB Connection
const mongoURI = 'mongodb+srv://josephcruel:RPsgRovde6Y43cAR@notescluster.pdmqjze.mongodb.net/';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Setting Routes
const notes = require('./backend/routes/notes');
app.use('/api/notes', notes);

app.use('/addnote', express.static(path.join(__dirname, 'frontend/src/pages/addnote')));
app.use('/home', express.static(path.join(__dirname, 'frontend/src/pages/home')));

// Default route
app.get('/', (req, res) => {
    res.redirect('/home');
});


// Set up port 3000 for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
