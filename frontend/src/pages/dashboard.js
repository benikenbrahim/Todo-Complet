import { useState } from "react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    details: "",
    type: "other",
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      title: newTask.title,
      details: newTask.details,
      type: newTask.type,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", details: "", type: "other" });
    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full border-r
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          transition-all duration-300 ease-in-out z-30
          ${sidebarOpen ? "w-64" : "w-0"}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Avatar Section */}
          <div className={`flex flex-col items-center py-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
              <svg className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2 px-4">
              <li>
                <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              
                  <span className="font-medium">tsaks</span>
                </a>
              </li>
              <li>
                <a href="/about" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                
                  <span className="font-medium">abouts</span>
                </a>
              </li>
              <li>
                <a href="/help" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  
                  <span className="font-medium">helps</span>
                </a>
              </li>
              <li>
                <a href="/home" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                 
                  <span className="font-medium">log out</span>
                </a>
              </li>

            </ul>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          flex-1 h-screen overflow-y-auto scrollbar-hide
          ${sidebarOpen ? "ml-64" : ""}
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-40 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center transition ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          title={darkMode ? 'Mode clair' : 'Mode sombre'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <div className="p-8 pt-20">
          <div className="flex gap-6 w-full">
            {/* LEFT SIDE - Tasks List */}
            <div className="flex-1">
              {/* Header Section */}
              <div className={`rounded-lg shadow-sm border p-6 mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>header of list tasks</h2>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`rounded-lg shadow-sm border p-6 flex items-center justify-between hover:shadow-md transition ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {index + 1}
                    </span>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`
                        w-6 h-6 rounded border-2 flex items-center justify-center transition
                        ${task.completed 
                          ? "bg-blue-500 border-blue-500" 
                          : darkMode 
                            ? "border-gray-600 hover:border-gray-500" 
                            : "border-gray-300 hover:border-gray-400"
                        }
                      `}
                    >
                      {task.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}

                {/* Empty Task Boxes */}
                {[1, 2].map((i) => (
                  <div
                    key={`empty-${i}`}
                    className={`rounded-lg shadow-sm border p-6 flex items-center justify-between ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
                      {tasks.length + i}
                    </span>
                    <div className={`w-6 h-6 rounded border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                  </div>
                ))}
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className={`mt-6 w-full py-3 px-6 rounded-lg transition font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                + Add New Task
              </button>

              {/* Add Task Form */}
              {showForm && (
                <div className={`mt-6 rounded-lg shadow-lg border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Create a New Task</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Details</label>
                      <textarea
                        name="details"
                        rows="3"
                        value={newTask.details}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                      <select
                        name="type"
                        value={newTask.type}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                      >
                        <option value="Administrative">Administrative</option>
                        <option value="managerial">Managerial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddTask}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium"
                      >
                        Save Task
                      </button>
                      <button
                        onClick={() => setShowForm(false)}
                        className={`flex-1 py-2 px-4 rounded-lg transition font-medium ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE - Analytics */}
            
          </div>
        </div>
      </main>
      <div className="w-96 flex-shrink-0 space-y-6">
              {/* Completion Stats */}
              <div className={`rounded-lg shadow-sm border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>📊 Statistiques</h3>
                
                {/* Completion Percentage */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tâches complétées</span>
                    <span className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                      style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Task Counts */}
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl"></span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Terminées</span>
                    </div>
                    <span className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {tasks.filter(t => t.completed).length}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl"></span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>En cours</span>
                    </div>
                    <span className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {tasks.filter(t => !t.completed).length}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl"></span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total</span>
                    </div>
                    <span className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {tasks.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Productivity Insight */}
              <div className={`rounded-lg shadow-sm border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Feedback</h3>
                
                {tasks.filter(t => t.completed).length === tasks.length ? (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                    <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                      🎉 Félicitations ! Toutes vos tâches sont terminées !
                    </p>
                  </div>
                ) : tasks.filter(t => t.completed).length === 0 ? (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                    <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                      🚀 Commencez à cocher vos tâches pour suivre vos progrès !
                    </p>
                  </div>
                ) : (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      💪 Bon travail ! Vous avez terminé {tasks.filter(t => t.completed).length} tâche{tasks.filter(t => t.completed).length > 1 ? 's' : ''} sur {tasks.length}.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className={`rounded-lg shadow-sm border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>⚡ Actions rapides</h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const allCompleted = tasks.every(t => t.completed);
                      setTasks(tasks.map(t => ({ ...t, completed: !allCompleted })));
                    }}
                    className={`w-full py-2 px-4 rounded-lg transition text-sm font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    {tasks.every(t => t.completed) ? '↩️ Décocher tout' : '✅ Tout cocher'}
                  </button>
                  
                  <button
                    onClick={() => setTasks(tasks.filter(t => !t.completed))}
                    className={`w-full py-2 px-4 rounded-lg transition text-sm font-medium ${darkMode ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
                  >
                    🗑️ Supprimer terminées
                  </button>
                </div>
              </div>
            </div>
    </div>
  );
}