const { version } = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verfyjwt = require('../middlewares/verfyjwt');
const { getAllTodos } = require('../DataLayer/todos');
dotenv.config();

const router = require('express').Router();



router.get('/Dashboard',verfyjwt, async (req, res) => {
    // Fetch todos from database using userId
    const data =await getAllTodos(); 
    console.log("Fetched todos for user:", req.cookies);
    res.json(data); // Placeholder response
});

module.exports = router;