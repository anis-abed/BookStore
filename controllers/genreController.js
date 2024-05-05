const express=require('express')
const Genre=require('../models/Genre')

const router = express.Router()


module.exports.addGenre = async function (req, res) {
    try {
        const { categorie } = req.body;
        const genre = new Genre({categorie});
        await genre.save();
        res.json( genre );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports.updBook = async function (req, res) {
    try {
        const _id =  req.body;
        const genre = await Genre.findById(_id);
        if (!genre) {
            return res.status(404).json('Book not found');
        }
        const { categorie } = req.body; 
        if (categorie) genre.categorie = categorie;
        await genre.save();
        res.json({ genre });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};
module.exports.delBook = async function (req, res) {
    try {
        const _id =  req.body;
        const  { categorie } = req.body; 

        const genre = await Genre.findById(_id);
        if (!genre) {
            return res.status(404).json('genre not found');
        }        
        await Genre.findByIdAndDelete(_id);
        res.json('Genre deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};

