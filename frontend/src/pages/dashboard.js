import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Check, Eye } from "lucide-react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const [newTask, setNewTask] = useState({
    title: "",
    details: "",
    type: "other",
  });

  useEffect(() => {
    fetch("https://todo-complet.onrender.com/Dashboard", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        console.log("DATA REÇUE:", data);
        setTasks(Array.isArray(data) ? data : []);
        setLoadingTasks(false);
      })
      .catch(err => {
        console.error("Erreur fetch tasks:", err);
        setLoadingTasks(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const deleteTask = async (id) => {
  try {
    await fetch(`https://todo-complet.onrender.com/dashboard/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // Mise à jour du state
    setTasks(prev => prev.filter(task => task._id !== id));

    // Si le modal est ouvert
    if (selectedTask?._id === id) {
      setSelectedTask(null);
    }

  } catch (err) {
    console.error("Erreur suppression task:", err);
  }
};

  const handleAddTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title: newTask.title,
      details: newTask.details,
      type: newTask.type,
      completed: false,
    };

    try {
      const res = await fetch("https://todo-complet.onrender.com/createTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      const created = await res.json();
      setTasks([...tasks, created]);
      setShowForm(false);
      setNewTask({ title: "", details: "", type: "other" });
    } catch (err) {
      console.error("Erreur ajout task:", err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await fetch(`https://todo-complet.onrender.com/dashboard/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ completed }),
      });

      setTasks(tasks.map(t =>
        t._id === id ? { ...t, completed } : t
      ));
    } catch (err) {
      console.error("Erreur toggle:", err);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      Administrative: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Managerial: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    };
    return colors[type] || colors.other;
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-20 transition-all duration-300 shadow-lg
          ${sidebarOpen ? "w-64" : "w-0"}
          ${darkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"}
        `}
      >
        {sidebarOpen && (
          <div className="flex flex-col h-full p-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                
              </div>
              <h2 className={`mt-3 font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Hello Sud!
              </h2>
            </div>

            <div className="mb-6 space-y-2">
              <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Total</span>
                  <span className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{stats.total}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-green-50"}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Complet</span>
                  <span className={`font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>{stats.completed}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-orange-50"}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Not yet</span>
                  <span className={`font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>{stats.pending}</span>
                </div>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              <a className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}>
                <span></span> Tasks
              </a>
              <a href="/Todo-complet/about" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}>
                <span></span> About
              </a>
              <a href="Todo-complet/help" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}>
                <span></span> Help
              </a>
            </nav>

            <a href="/Todo-complet/home" className={`mt-4 flex items-center gap-3 p-3 rounded-lg transition-colors ${darkMode ? "bg-red-900 hover:bg-red-800 text-red-200" : "bg-red-50 hover:bg-red-100 text-red-700"}`}>
              <span> </span> Sign out
            </a>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 h-full overflow-y-auto transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className={`sticky top-0 z-10 backdrop-blur-sm ${darkMode ? "bg-gray-900/90 border-b border-gray-700" : "bg-white/90 border-b border-gray-200"}`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
              >
                {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
              </button>
              <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Mes Tâches
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex rounded-lg overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 transition-colors ${viewMode === "grid" ? (darkMode ? "bg-gray-600" : "bg-white") : ""}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 transition-colors ${viewMode === "list" ? (darkMode ? "bg-gray-600" : "bg-white") : ""}`}
                >
                  ☰
                </button>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"}`}
              >
                {darkMode ? "dark" : "light"}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loadingTasks && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!loadingTasks && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" : "space-y-3 mb-6"}>
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`
                    group relative rounded-xl shadow-md transition-all duration-200 overflow-hidden
                    ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:shadow-lg"}
                    ${task.completed ? "opacity-75" : ""}
                  `}
                >
                  <div className={`h-1 ${task.completed ? "bg-green-500" : "bg-blue-500"}`}></div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-1 ${task.completed ? "line-through" : ""} ${darkMode ? "text-white" : "text-gray-800"}`}>
                          {task.title}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                          {task.type}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          toggleTask(task._id, !task.completed);
                            window.location.reload();
                        }}
                        
                        className={`
                          w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                          ${task.completed 
                            ? "bg-green-500 border-green-500" 
                            : darkMode ? "border-gray-600 hover:border-green-500" : "border-gray-300 hover:border-green-500"
                          }
                        `}
                      >
                        {task.completed && <Check size={16} className="text-white" />}
                      </button>
                      
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      
                    <button
                      onClick={() => deleteTask(task._id)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm
                        transition-colors border
                        ${darkMode 
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300"}
                      `}
                    >
                      Delete
                    </button>

                  </div>
                    </div>


                    {task.details && (
                      <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {task.details}
                      </p>
                    )}

                    {task.sous_tasks && task.sous_tasks.length > 0 && (
                      <div className="mb-3">
                        <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                          {task.sous_tasks.length} Sub Tasks(s)
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
                      >
                        <Eye size={16} />
                        Voir
                      </button>
                     

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowForm(!showForm)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <Plus size={24} />
          </button>
        </div>
      </main>

      {/* ADD TASK MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Nouvelle Tâche
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Entrez le titre..."
                  value={newTask.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Détails
                </label>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="Description de la tâche..."
                  value={newTask.details}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Type
                </label>
                <select
                  name="type"
                  value={newTask.type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500" : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  <option value="Administrative">Administrative</option>
                  <option value="Managerial">Managerial</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Create a task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASK DETAIL MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Détails de la Tâche
              </h2>
              <button
                onClick={() => setSelectedTask(null)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {selectedTask.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedTask.type)}`}>
                    {selectedTask.type}
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-lg font-semibold ${selectedTask.completed ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"}`}>
                  {selectedTask.completed ? " complete" : "not yet"}
                </div>
              </div>

              {selectedTask.details && (
                <div>
                  <h4 className={`text-sm font-semibold mb-2 uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Description
                  </h4>
                  <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {selectedTask.details}
                  </p>
                </div>
              )}

              <div>
                <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Sous-tâches ({selectedTask.sous_tasks?.length || 0})
                </h4>
                {selectedTask.sous_tasks && selectedTask.sous_tasks.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedTask.sous_tasks.map((st, idx) => (
                      <li key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                          {idx + 1}
                        </span>
                        <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                          {st}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`text-sm italic ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Aucune sous-tâche
                  </p>
                )}
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`block font-semibold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      ID
                    </span>
                    <span className={`font-mono text-xs ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {selectedTask._id}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-semibold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Version
                    </span>
                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      v{selectedTask.__v}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    toggleTask(selectedTask._id, !selectedTask.completed);
                    setSelectedTask({...selectedTask, completed: !selectedTask.completed});
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${selectedTask.completed ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                >
                  {selectedTask.completed ? "Marquer en cours" : "Marquer comme complétée"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}