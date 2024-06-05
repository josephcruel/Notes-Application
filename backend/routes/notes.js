const express = require('express');
const router = express.Router();

// Note model
const Note = require('../models/note');

// Get all the notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single note by ID
router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});

// Create a new note
router.post('/', async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date().toISOString()
    });

    try {
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a note
router.put('/:id', getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    res.note.updatedAt = new Date().toISOString();

    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Deleted Note' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware to get a note by ID
async function getNote (req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 

    res.note = note;
    next();
}

module.exports = router;
