const {TodoFactoryMethod} = require('../BusinessLayer/todo');
const dao                 = require('../DaoLayer/dao');


function addTodo() {
  var todoName = "todo " + " task " + dao.readAllTodos().length;
  var todoType = Math.fround(Math.random() * 11);
  dao.createTodo(TodoFactoryMethod.createTodoTask(todoType, todoName));
}

function getTodo() {
  return ;
}
 
function getAllTodos() {
  return dao.readAllTodos();
}

function modifyTodo() {
  return ;
}

function removeTodo() {
  return ;
}

function removeAllTodos() {
  return ;
}

module.exports = {addTodo, getTodo, getAllTodos, modifyTodo, removeTodo, removeAllTodos};
