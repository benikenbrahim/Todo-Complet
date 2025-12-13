const express = require("express");
const bodyParser = require("body-parser");
const autrouter = require('../routes/authRoute');
const router = require('../routes/displayTodo');
const routerTodos = require('../routes/creatTodo');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Correction orthographe
const auth = require('../routes/auth');
const passport = require("passport");
const session = require('express-session');

dotenv.config();
var app = express();

//////////////////////////////////////
// IMPORTANT: Ordre correct des middlewares
//////////////////////////////////////

// 1. Cookie parser EN PREMIER (avant les routes)
app.use(cookieParser());

// 2. Body parser
app.use(bodyParser.json());

// 3. CORS
app.use(cors({
    origin: ['https://benikenbrahim.github.io', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 4. Session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

//////////////////////////////////////
// Connection to database
//////////////////////////////////////
const { connectDB } = require('../DaoLayer/dao');
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB database');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

//////////////////////////////////////
// Routes
//////////////////////////////////////

app.get('/health', (req, res) => res.json({ ok: true }));

// Route Google
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/Dashboard',
        failureRedirect: '/failure'
    })
);

app.get('/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

// Routes principales
app.use('/auth', autrouter);
app.use('/', router);
app.use('/', routerTodos);