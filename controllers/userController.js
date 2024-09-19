const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Reward = require('../models/Reward');

exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.render('user/products', { products });
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
  );
  if (cart !== null) {
    res.render('user/cart', { cart, deliveryCharges: 40 });
  } else {
    res.render('user/cart', {
      cart: { items: [], totalPrice: 0, totalReward: 0 },
    });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })

      //  console.log(orders);
      .populate({
        path: 'items.product',
        model: 'Product',
        select: 'name price', // Select the fields you want to populate
      });

    console.log(JSON.stringify(orders, null, 2)); // Pretty print the orders for debugging
    res.render('user/orderhistory', { orders: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
};

exports.addToCart = async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart === null) {
    cart = new Cart({
      user: req.user._id,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
      totalReward: product.reward * quantity,
    });
  } else {
    const existingItem = cart.items.find(
      item => item.product.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }
    cart.totalPrice += product.price * quantity;
    cart.totalReward += product.reward * quantity;
  }

  await cart.save();
  res.redirect('/user/cart');
};

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const itemId = req.params.itemId;

  const item = cart.items.find(item => item._id.toString() === itemId);
  const product = await Product.findById(item.product);

  cart.totalPrice -= product.price * item.quantity;
  cart.totalReward -= product.reward * item.quantity;
  cart.items = cart.items.filter(item => item._id.toString() !== itemId);

  await cart.save();
  res.redirect('/user/cart');
};

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
  );
  const totalPrice = cart.totalPrice;
  const totalReward = cart.totalReward;

  const order = new Order({
    user: req.user._id,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
      reward: item.product.reward,
    })),
    totalPrice,
    totalReward,
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
  });

  await order.save();
  await Cart.findOneAndDelete({ user: req.user._id });
  res.redirect('/user/orderhistory');
};

exports.reward = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  let totalRewardPoints = 0;
  orders.map(order => {
    totalRewardPoints += order.totalReward;
  });

  console.log(totalRewardPoints);
  res.render("user/reward",{totalRewardPoints})
};
