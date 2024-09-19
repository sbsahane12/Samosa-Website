const express = require('express');
const router = express.Router();
const {getProducts, getCart, getOrderHistory, addToCart, removeFromCart, placeOrder,reward } = require('../controllers/userController');
const auth = require('../middleware/auth');

// router.use(auth);

router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/orderhistory', getOrderHistory);
router.post('/cart/add/:productId', addToCart);
router.get('/cart/remove/:itemId', removeFromCart);
router.post('/order/place', placeOrder);
router.get("/reward",reward);

module.exports = router;
