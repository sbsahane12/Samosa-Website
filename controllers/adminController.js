const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Admin Dashboard
exports.getDashboard = async (req, res) => {
    res.render('admin/dashboard');
};

// Manage Products
exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.render('admin/products/index', { products });
};

exports.createProduct = async (req, res) => {
    const { name, description, price,reward,category, stock, imageUrl } = req.body;
    const product = new Product({ name, description, price, reward, category, stock, imageUrl });
    await product.save();
    res.redirect('/admin/products');
};

exports.updateProduct = async (req, res) => {
    const { name, description, price,reward, category, stock, imageUrl } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, description, price,reward, category, stock, imageUrl });
    res.redirect('/admin/products');
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
};

// Manage Users
exports.getUsers = async (req, res) => {
    const users = await User.find({});
    res.render('admin/users/index', { users });
};


exports.updateUser = async (req, res) => {
    const { name, email, phone, address,role } = req.body;
    console.log(req.body);
    await User.findByIdAndUpdate(req.params.id, { name, email, phone, address,role });
    res.redirect('/admin/users');
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/users');
};

// Manage Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user')
            .populate({
                path: 'items.product',
                model: 'Product',
                select: 'name price'  // Select the fields you want to populate
            });

        console.log(JSON.stringify(orders, null, 2));  // Pretty print the orders for debugging
        res.render('admin/orders/index', { orders: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
};
exports.createOrder = async (req, res) => {
    console.log(
        "order is ready for createion"
    )
};

exports.deleteOrder=async(req,res)=>{
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/admin/orders');
}


exports.updateOrder=async(req,res)=>{
    console.log(req.body);
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/orders');
}

// // other admin functions as needed
