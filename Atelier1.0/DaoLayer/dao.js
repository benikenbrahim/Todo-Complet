const {users}           = require('../DataLayer/users');
const {authorizedUsers} = require('../DataLayer/authorizedUsers');
const mongoose = require('mongoose');
const {addTodo, getTodo, deleteTodos} = require('../DataLayer/todos');

const connectDB = () => {
    
    mongoose.connect(process.env.MONGODB_URI )
    .then(()=>console.log("Database connected successfully"))
    .catch((err)=>console.log("Database connection failed: ", err));
    return mongoose;
}

function disconnectDB() {
  mongoose.connection.close();
  console.log("Database disconnected successfully");
}

function createTodo(todo) {
  connectDB();
  const result = addTodo(todo);
  return result;
}

function readTodo(userID) {
  connectDB();
  const result = getTodo(userID);
  
  return result;
}
 
function readAllTodos() {
  var db = connectDB();
  const result = db.getTodos();
  db = disconnectDB();
  return result;
}

// function updateTodo() {
//   return ;
// }

function deleteTodo(userId) {
  connectDB();
  deleteTodos(userId);
   return ;
 }



module.exports = {connectDB, createTodo, readTodo, readAllTodos, deleteTodo} 