const { version } = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verfyjwt = require('../middlewares/verfyjwt');
const decodeToken = require("../middlewares/decodetocken");
const { getAllTodos } = require('../DataLayer/todos');
dotenv.config();

const router = require('express').Router();



router.get('/Dashboard', async (req, res) => {
    const decodeTocken=decodeToken(req.cookies.accessToken);
    const userId= decodeTocken ? decodeTocken.userId : null;
    // Fetch todos from database using userId
    const data =await getAllTodos(userId); 
    console.log("Fetched todos for user:", req.cookies);
    res.json(data); // Placeholder response
});

module.exports = router;