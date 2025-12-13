const routerTodos = require('express').Router();
const {createTodo, readTodo, deleteTodo} = require('../DaoLayer/dao');

const verfyjwt = require('../middlewares/verfyjwt');
const decodeToken = require("../middlewares/decodetocken");

routerTodos.post('/createTodo', async (req, res) => {
    const { title, details, type, completed } = req.body;
    const decodedToken = decodeToken(req.cookies.accessToken);
    const userId = decodedToken ? decodedToken.userId : null;
    console.log("User ID from cookies:", userId);
    console.log("Received todo data:", req.body);
    try {
        const newTodo = {
            userId,
            title,
            details,
            type: type || 'other',
            completed: completed || false
        };
        const savedTodo = await createTodo(newTodo);
        res.status(201).json({ message: 'Todo created successfully', todo: savedTodo });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

routerTodos.get('/getTodo', async(req,res)=>{
    const userId = req.query.userId;
    try{
        const todos= await readTodo(userId);
        res.status(200).json({todos});
    }catch(error){
        console.error("error creating todo",error);
        res.status(500).json({message:'Server error'});
    }
});
routerTodos.delete("/deleteTodo", verfyjwt, async(req,res)=>{
    const userId = req.body.userId;
    try{
        await deleteTodo(userId);
        res.status(200).json({message:"todo deleted"});

    }catch(error){
        console.error("error deleting",error);
        res.status(500).json({message:'server error'})

    }});


module.exports = routerTodos;