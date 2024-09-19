// Cart Model
const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 },
    totalReward: { type: Number, default: 0 } // Added totalReward field
});

module.exports = mongoose.model('Cart', CartSchema);
