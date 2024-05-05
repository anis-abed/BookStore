const express=require('express')
const Author=require('../models/Author');
const author = require('../models/Author');

const router = express.Router()


module.exports.addAuthor = async function (req, res) {
    try {
        const { name,bio } = req.body;
        const author = new Author({ name,bio });
        await author.save();
        res.json( author );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports.updAuthor = async function (req, res) {
    try {
        const _id =  req.body;
        const author = await Author.findById(_id);
        if (!author) {
            return res.status(404).json('author not found');
        }
        const { name,bio } = req.body; 
        if (name) author.name = name;
        if (bio) author.bio = bio;

        await author.save();
        res.json({ author });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};
module.exports.delAuthor = async function (req, res) {
    try {
        const _id =  req.body;

        const author = await Author.findById(_id);
        if (!author) {
            return res.status(404).json('author not found');
        }        
        await Author.findByIdAndDelete(_id);
        res.json('author deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};
