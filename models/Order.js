const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true
    }
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;