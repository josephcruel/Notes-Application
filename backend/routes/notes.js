// Import Express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Note model
const Note = require('../models/note');

// Get all the notes
router.get('/', auth, async (req, res) => {
    try {
        // Fetch notes from the database
        const notes = await Note.find();
        // Put the fetched note in JSON
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single note by ID
router.get('/:id', auth, getNote, (req, res) => {
    // Respond with the note fetched by the middleware
    res.json(res.note);
});

// Create a new note
router.post('/', auth, async (req, res) => {
    // Create a new instance of a new note
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date().toISOString()
    });

    try {
        // Save this note in the database
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a note
router.put('/:id', auth, getNote, async (req, res) => {
    // Update the title if it is present in the request body
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    // Update the content if it is present in the request body
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    // Update the date to the current date and time
    res.note.updatedAt = new Date().toISOString();

    try {
        // Save this updated note in the database
        const updatedNote = await res.note.save();
        // Put the updated note in JSON
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
    try {
        // Find the note with a certain ID and delete
        const note = await Note.findOneAndDelete({ _id: req.params.id });
        // If the note is not found, send an error
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // Note Deleted
        res.json({ message: 'Deleted Note' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware to get a note by ID
async function getNote (req, res, next) {
    let note;
    try {
        // Find the note with the ID
        note = await Note.findById(req.params.id);
        // If the note is not found, send an error
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 

    // Attach the fetched note to the response object
    res.note = note;
    next();
}

// Export the router 
module.exports = router;
