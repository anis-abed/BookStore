const express=require('express')
const User=require('../models/User')

const router = express.Router()


module.exports.addUser = async function (req, res) {
    try {
        const { name,password,email } = req.body;
        const user = new User({ name,password,email });
        await user.save();
        res.json( user );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

