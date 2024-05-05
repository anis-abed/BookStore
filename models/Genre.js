
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    categorie: {
        type: String,
        required: true
    }
});

const genre = mongoose.model('genre', genreSchema);

module.exports = genre;
