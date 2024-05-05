const express=require('express')
const Order=require('../models/Order')
const Book=require('../models/Book')
const user=require('../models/User')
const {purBook,restBook } = require('../controllers/bookController');

const router = express.Router()


module.exports.addOrder = async function (req, res) {
    try {
        const { user, date, book, quantity, status } = req.body;
        const order = new Order({ user, date, book, quantity, status });
        
        // Call purBook function with book ID and quantity
        const purBookResult = await purBook({ _id: book, qt: quantity });
        
        // Handle the result
        console.log('thiiis', purBookResult);
        await order.save();
        res.json(order);
    } catch (err) {
        if (err.message === 'Stock insuffisant') {
            res.status(400).json({ error: 'Stock insuffisant' });
        } else {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};


module.exports.listOrders = async function (req, res) {
    try {
        const Orders = await Order.find().populate('user').populate('book');
        res.json({ Orders });
    } catch (err) {
        console.error(err);
        res.json( 'No Orders' );
        
    }
};

