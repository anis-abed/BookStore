const express=require('express')
const Book=require('../models/Book')
const author=require('../models/Author')

const router = express.Router()


module.exports.addBook = async function (req, res) {
    try {
        const { title, author, date,genre,price,stock } = req.body;
        const book = new Book({ title, author, date,genre,price,stock });
        await book.save();
        res.json( book );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


module.exports.listBooks = async function (req, res) {
    try {
        const Books = await Book.find().populate('author').populate('genre');
        res.json({ Books });
    } catch (err) {
        console.error(err);
        res.json( 'No Books' );
        
    }
};

module.exports.getBook = async function (req, res) {
    try {
        const { title,author,genre } = req.body; 
        console.log('Searching for book with title:', title,author,genre);
        const query = {};

        if (title) {
            query.title = { $regex: '^' + title };
        }
        if (author) {
            query.author = { $regex: '^' + author };
        }
        if (genre) {
            query.genre = { $regex: '^' + genre };
        }
        console.log(query);
        if (Object.keys(query).length === 0) {
            res.json('il ya pas un critere de recherche');
            return; 
        }
        const books = await Book.find(query);
        console.log('Found books:', books);
        if (books.length > 0) {
            res.json(books);
        } else {
            res.json('No Books Found');
        }
    } catch (err) {
        console.error('Error searching for books:', err);
        res.status(500).json(' Server Error');
    }
};
module.exports.updBook = async function (req, res) {
    try {
        const _id =  req.body;
        const book = await Book.findById(_id);
        if (!book) {
            return res.status(404).json('Book not found');
        }
        const { title, author, date,genre,price,stock } = req.body; 
        if (title) book.title = title;
        if (author) book.author = author;
        if (date) book.date = date;
        if (genre) book.genre = genre;
        if (price) book.price = price;
        if (stock) book.stock = stock;

        await book.save();
        res.json({ book });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};
module.exports.delBook = async function (req, res) {
    try {
        const _id =  req.body;
        const { title, author, date,genre,price,stock } = req.body; 

        const book = await Book.findById(_id);
        if (!book) {
            return res.status(404).json('Book not found');
        }        
        await Book.findByIdAndDelete(_id);
        res.json('Book deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};
module.exports.restBook = async function (req, res) {
    try {
        const { _id,stock } = req.body; 
        const book = await Book.findById(_id);
        if (!book) {
            return res.status(404).json('Book not found');
        }

        book.stock += stock 
        await book.save();     
        res.json('No ');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};

module.exports.purBook = async function (req, res) {
    try {
        const { _id,qt } = req.body; 
        const book = await Book.findById(_id);
        if (!book) {
            return res.status(404).json('Book not found');
        }

        book.stock -= qt 
        await book.save();     
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
}
module.exports.purBook = async function ({ _id, qt }) {
    try {
        const book = await Book.findById(_id);
        if (!book) {
            throw new Error('Book not found');
        }

        book.stock -= qt;
        if (book.stock - qt < 0) {
            throw new Error('Stock insuffisant');
        }
        await book.save();
        
        return book;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

