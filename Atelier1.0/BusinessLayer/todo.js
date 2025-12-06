
class TodoTask {
    constructor(name) {
      this.name     = name;
      this.type     = undefined;
      this.load     = Math.floor(Math.random() * 101);
      this.subtasks = [];
    }
      
    getTaskName() {
      return this.name;
    }
     
    setTaskName(name) {
      this.name = name;
    }

    getTaskType(type) {
      return this.type;
    }
    setTaskType(type) {
      this.type = type;
    }

    getTaskLoad() {
      var totalLoad = this.load;
      this.subtasks.forEach(st => {
        totalLoad += st.getTaskLoad();
      });
      return totalLoad;
    }
   
    setTaskLoad(load) {
      this.load = load;
    }

    getSubtasks() {
      return this.subtasks;
    }
    
    isEngineeringTask() {
      //To be implemented by the subclasses
    }

    isManagerialTask() {
      //To be implemented by the subclasses
    }

    isAdministrativeTask() {
      //To be implemented by the subclasses
    }

}//End TodoTask Class


class EngineeringTodoTask extends TodoTask {
    constructor(name) {
      super(name);
      this.setTaskType("Engineering");
    }

    isEngineeringTask() {
      return true;
    }

    isManagerialTask() {
      return false;
    }

    isAdministrativeTask() {
      return false;
    }
    
  }//End EngineeringTodoTask Class

  
class ManagerialTodoTask extends TodoTask {
    constructor(name) {
      super(name);
      this.setTaskType("Managerial");
    }

    isEngineeringTask() {
      return true;
    }

    isManagerialTask() {
      return false;
    }

    isAdministrativeTask() {
      return false;
    }
    
  }//End ManagerialTodoTask Class

  
class AdministrativeTodoTask extends TodoTask {
    constructor(name) {
      super(name);
      this.setTaskType("Administrative");
    }

    isEngineeringTask() {
      return false;
    }

    isManagerialTask() {
      return false;
    }

    isAdministrativeTask() {
      return true;
    }
    
  } //End AdministrativeTodoTask Class

  class TodoFactoryMethod {  
    constructor() { 
      this.fmInstance = undefined;
    }
  
    static createTodoTask(todoType, todoName) {
         if (todoType < 3) {
           const newTask = new EngineeringTodoTask(todoName);
           newTask.getSubtasks().push(new EngineeringTodoTask(todoName+"1"));
           newTask.getSubtasks().push(new EngineeringTodoTask(todoName+"2"));
           newTask.getSubtasks().push(new EngineeringTodoTask(todoName+"3"));
           return newTask;
         }
  
         if (todoType < 4) {
           const newTask = new EngineeringTodoTask(todoName);
           return newTask;
         }
  
         if (todoType < 6) {
           const newTask = new ManagerialTodoTask(todoName);
           newTask.getSubtasks().push(new ManagerialTodoTask(todoName+"1"));
           newTask.getSubtasks().push(new ManagerialTodoTask(todoName+"2"));
           newTask.getSubtasks().push(new ManagerialTodoTask(todoName+"3"));
           return newTask;
         }
  
         if (todoType < 7) {
           const newTask = new ManagerialTodoTask(todoName);
           return newTask;
         }
  
         if (todoType < 8) {
           const newTask = new AdministrativeTodoTask(todoName);
           newTask.getSubtasks().push(new AdministrativeTodoTask(todoName+"1"));
           newTask.getSubtasks().push(new AdministrativeTodoTask(todoName+"2"));
           newTask.getSubtasks().push(new AdministrativeTodoTask(todoName+"3"));
           return newTask;
         }
  
         if (todoType < 11) {
           const newTask = new AdministrativeTodoTask(todoName);
           return newTask;
         }
    }
  }//End TodoFactoryMethod Class
  

module.exports = {TodoFactoryMethod};