const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', register);
router.get('/', (req, res) => res.render('auth/login'));
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
