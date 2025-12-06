const User = require('../DataLayer/users');
const express = require('express');
const authrouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Utilisez les variables d'environnement pour les secrets
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;

authrouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        console.log("password hashed");
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        const accessToken = jwt.sign(
            { userId: newUser._id, roles: newUser.roles },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: newUser._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        console.log('tokens generated');

        // Cookies settings for development
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // false for localhost
            sameSite: 'lax', // 'lax' for localhost
            path: '/', // Important!
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/', // Important!
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({ message: 'User registered successfully' });
        console.log('success registration');

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


authrouter.post('/login', async (req, res) => {
    const { email, password } = req.body; 
    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const accessToken = jwt.sign(
            { userId: existingUser._id, roles: existingUser.roles },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: existingUser._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        console.log('tokens generated');

        // Cookies settings for development
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // false for localhost
            sameSite: 'lax', // 'lax' for localhost
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({ message: 'User logged in successfully' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


authrouter.get('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   
    // FIX: Utilisez le bon secret (avec L à la fin, pas B)
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Forbidden' });  
        }
        const accessToken = jwt.sign(
            { userId: decode.userId },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.cookie('accessToken', accessToken, {    
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(200).json({ message: 'Access token refreshed' });
    });
});

module.exports = authrouter;