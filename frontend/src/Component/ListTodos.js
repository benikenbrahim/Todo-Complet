import { useState, useEffect } from "react";
import "./css/ListTodo.css";

export default function ListTodos({ sidebarClosed }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/Dashboard", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      
      const todosWithStatus = data.map(task => ({
        ...task,
        status: task.status || "en_cours"
      }));
      
      setTodos(todosWithStatus);
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTodos = todos.map(task => 
        task._id === draggedTask._id 
          ? { ...task, status: newStatus }
          : task
      );
      setTodos(updatedTodos);
    }
    setDraggedTask(null);
  };

  const getTasksByStatus = (status) => {
    return todos.filter(task => task.status === status);
  };

  const TaskCard = ({ task }) => (
    <div 
      className="task-card"
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
    >
      <h5 className="task-title">{task.title || "No title"}</h5>
      
      {task.details && (
        <p className="task-details">{task.details}</p>
      )}
      
      {task.type && (
        <span className="task-type-badge">{task.type}</span>
      )}
      
      {Array.isArray(task.sous_tasks) && task.sous_tasks.length > 0 && (
        <div className="subtasks-container">
          <h6 className="subtasks-title">Sous-tâches:</h6>
          <ul className="subtasks-list">
            {task.sous_tasks.map((st, index) => (
              <li key={index} className="subtask-item">
                {st}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const Column = ({ title, status, tasks, icon, color }) => (
    <div 
      className="column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <div className={`column-header ${color}`}>
        <span className="column-icon">{icon}</span>
        <h3 className="column-title">{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="column-content">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task._id} task={task} />)
        ) : (
          <div className="empty-state">
            <p>Aucune tâche</p>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className={`todos-container ${sidebarClosed ? "full-width" : ""}`}>
      
      <div className="columns-container">
        <div className="spacer" >
        <Column 
          title="En cours"
          status="en_cours"
          tasks={getTasksByStatus("en_cours")}
          icon="⚡"
          color="gray"
        />
        </div>
        <div className="spacer" >
        <Column 
          title="Terminé"
          status="terminé"
          tasks={getTasksByStatus("terminé")}
          icon="✅"
          color="gray"
        />
        </div>
        </div>
    </div>
  );
}