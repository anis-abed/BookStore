const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    },
    date: {
        type: String,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0

    }
    
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;