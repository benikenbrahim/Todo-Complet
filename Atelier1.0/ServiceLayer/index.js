const express          = require("express");
const bodyParser       = require("body-parser");
const autrouter           = require('../routes/authRoute');
const router =require('../routes/displayTodo');
const routerTodos =require('../routes/creatTodo');
const mongoose         = require('mongoose');
const cors             = require('cors');
const dotenv           = require('dotenv');
const cockiesParser     = require('cookie-parser');
const auth = require('../routes/auth');
const passport = require("passport");
dotenv.config();  
const session = require('express-session');
var app    = express();

app.use(cockiesParser());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

//////////////////////////////////////
// connection to database:
const {connectDB} = require('../DaoLayer/dao');
connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database');
  app.listen(PORT = process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
}); 

//////////////////////////////////////


app.get('/health', (req, res) => res.json({ ok: true }));


//route google


app.get('/auth/google',
  passport.authenticate('google',
   { scope: ['profile', 'email'] 
  }));

app.get('/google/callback',
  passport.authenticate('google', { 
    successRedirect: 'http://localhost:3000/Dashboard',
    failureRedirect: '/failure' 
  })
);

app.get('/failure', (req, res) => {
  res.send('Failed to authenticate..');
});













app.use(bodyParser.json()); 




app.use(cors({
    origin: 'https://benikenbrahim.github.io', // URL de votre frontend React
    credentials: true, // Permet l'envoi de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/auth', autrouter);
app.use('/',router);
app.use('/',routerTodos);


////////////////////////////////////////

///////////////////////////////////////
