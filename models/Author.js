
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
    
});

const author = mongoose.model('author', authorSchema);

module.exports = author;
