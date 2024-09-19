const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registration handler
const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use.');
        }

        existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).send('Phone number already in use.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, phone, address });
        await user.save();

        res.status(201).send('Registration successful! Please log in.');
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Registration failed. Please try again.');
    }
};

// Login handler
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);

        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/user/products');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Login failed. Please try again.');
    }
};

// Logout handler
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = { register, login, logout };
