// Import Mongoose
const mongoose = require('mongoose');

// Defining the Schema for notes
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Note model based on the NoteSchema
module.exports = mongoose.model('Note', NoteSchema);
