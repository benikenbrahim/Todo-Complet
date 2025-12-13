const { version } = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verfyjwt = require('../middlewares/verfyjwt');
const decodeToken = require("../middlewares/decodetocken");
const { getAllTodos } = require('../DataLayer/todos');
const { deleteTodoById } = require("../DataLayer/todos");
const { updateTodoCompleted } = require('../DataLayer/todos');

dotenv.config();

const router = require('express').Router();


router.delete("/dashboard/delete/:id", verfyjwt, async (req, res) => {
  try {
    const decoded = decodeToken(req.cookies.accessToken);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decoded.userId;
    const todoId = req.params.id;

    const deletedTodo = await deleteTodoById(todoId, userId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ success: true, deletedId: todoId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.patch("/dashboard/:id", verfyjwt, async (req, res) => {
  try {
    const decoded = decodeToken(req.cookies.accessToken);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decoded.userId;
    const todoId = req.params.id;
    const { completed } = req.body;

    const updatedTodo = await updateTodoCompleted(
      todoId,
      userId,
      completed
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/Dashboard', async (req, res) => {
     console.log("Received request to /Dashboard");
    const decodeTocken=decodeToken(req.cookies.accessToken);
    const userId= decodeTocken ? decodeTocken.userId : null;
    // Fetch todos from database using userId
    const data =await getAllTodos(userId); 
    console.log("Fetched todos for user:", req.cookies);
    res.json(data); // Placeholder response
});

module.exports = router;