const express = require('express');
const router = express.Router();
const { getDashboard, getProducts,createProductForm, createProduct, editProduct, updateProduct, deleteProduct, getUsers, updateUser, deleteUser, getOrders, createOrder,updateOrder,deleteOrder } = require('../controllers/adminController');
const auth = require('../middleware/auth');

// router.use(auth);
router.get('/dashboard', getDashboard);

//Products
router.get('/products', getProducts);
router.post('/products/create', createProduct);
router.post('/products/update/:id', updateProduct);
router.post('/products/delete/:id', deleteProduct);

//Users
router.get('/users', getUsers);
router.post('/users/update/:id', updateUser);
router.post('/users/delete/:id', deleteUser);

//Orders
router.get('/orders', getOrders);
router.post('/orders/create', createOrder);
router.post('/orders/update/:id', updateOrder);
router.post('/orders/delete/:id', deleteOrder);


module.exports = router;
