const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  details: { type: String },
  type: { type: String, enum: ['Administrative', 'managerial', 'other'], default: 'other',required: true },
  dueDate: { type: Date },
  sous_tasks: [{ type: String }],
  completed: { type: Boolean, default: false }
}); 


const Todo = mongoose.model('Todo', todoSchema);

  // class TodoSingleton {
  //   constructor() {
  //     if (!TodoSingleton.instance) {
  //         TodoSingleton.instance = this;
  //         this.TodoModel = Todo;

  //     }
  //     return TodoSingleton.instance;
  //     }
  //     getTodoInstance() {
  //         return this.TodoModel;
  //     }
  // }
  // const instance = new TodoSingleton();
  // Object.freeze(instance);

  // module.exports = instance;

async function updateTodoCompleted(todoId, userId, completed) {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId }, // 🔐 sécurité
      { completed },
      { new: true }
    );

    return updatedTodo;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du todo :", error);
    throw error;
  }
}


  async function getAllTodos(userId) {
  try {
    const todos = await Todo.find({ userId: userId });  // retourne tous les documents
    return todos;
  } catch (error) {
    console.error("Erreur lors de la récupération des todos :", error);
    throw error;
  }
}

  async function addTodo(todoData) {
    const todo = new Todo(todoData);
    return await todo.save();
  }

  async function getTodo(userID) {
    return await Todo.find({ userId: userID});
  } 

  async function getTodos() {
    return await Todo.find();
  }

  async function deleteTodos(userId) {
    return await Todo.deleteMany({ userId: userId });
  }
  async function findTodosByUserId(userId) {
  connectDB();// rendre tous les list de todos

  const result = Todo.find({userId:userId});
  console.log("DAO Layer - Todos found for userId:", userId, result);
  return result;
}

async function deleteTodoById(todoId, userId) {
  try {
    return await Todo.findOneAndDelete({
      _id: todoId,
      userId // 🔐 sécurité
    });
  } catch (error) {
    console.error("Erreur suppression todo :", error);
    throw error;
  }
}


  module.exports = { Todo ,addTodo, getTodo, getTodos,deleteTodos, findTodosByUserId, getAllTodos,updateTodoCompleted,deleteTodoById };
