// Product Model
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, required: true },
    imageUrl: { type: String },
    reward: { type: Number, default: 0 } // Added reward field
});

module.exports = mongoose.model('Product', ProductSchema);
