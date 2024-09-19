const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        reward: { type: Number, required: true } // Added reward field
    }],
    totalPrice: { type: Number, required: true },
    totalReward: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
