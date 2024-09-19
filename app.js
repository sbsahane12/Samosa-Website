const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const setUser = require('./middleware/setUser');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(setUser);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));



// Middleware
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
