import { useState, useEffect } from "react";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [newTask, setNewTask] = useState({
    title: "",
    details: "",
    type: "other",
  });

  /** ============================
   *   1. FETCH TASKS FROM BACKEND
   *  ============================ */
  useEffect(() => {
    fetch("https://ton-backend.com/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoadingTasks(false);
      })
      .catch(err => {
        console.error("Erreur fetch tasks:", err);
        setLoadingTasks(false);
      });
  }, []);

  /** ============================
   *   UPDATE INPUT STATE
   *  ============================ */
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  /** ============================
   *   ADD NEW TASK (BACKEND)
   *  ============================ */
  const handleAddTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title: newTask.title,
      details: newTask.details,
      type: newTask.type,
      completed: false,
    };

    try {
      const res = await fetch(" https://todo-complet.onrender.com/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  /** ============================
   *   TOGGLE TASK DONE
   *  ============================ */
  const toggleTask = async (id, completed) => {
    try {
      await fetch(` https://todo-complet.onrender.com/dashboard/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      setTasks(tasks.map(t =>
        t.id === id ? { ...t, completed } : t
      ));
    } catch (err) {
      console.error("Erreur toggle:", err);
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>


      {/* =============================
          SIDEBAR
      ============================== */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-20 border-r transition-all duration-300 
          ${sidebarOpen ? "w-64" : "w-0"}
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gray-500 rounded-full mx-auto"></div>
          </div>

          <nav className="space-y-2">
            <a className="block p-3 rounded hover:bg-gray-300 dark:hover:bg-gray-700">Tasks</a>
            <a href="/about" className="block p-3 rounded hover:bg-gray-300 dark:hover:bg-gray-700">About</a>
            <a href="/help" className="block p-3 rounded hover:bg-gray-300 dark:hover:bg-gray-700">Help</a>
            <a href="/home" className="block p-3 rounded hover:bg-gray-300 dark:hover:bg-gray-700">Log out</a>
          </nav>
        </div>
      </aside>


      {/* =============================
          MAIN CONTENT
      ============================== */}
      <main
        className={`
          flex-1 h-full overflow-y-auto transition-all duration-300 ml-0
          ${sidebarOpen ? "ml-64" : "ml-0"}
        `}
      >
        {/* TOGGLE SIDEBAR */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-30 bg-gray-800 text-white w-10 h-10 rounded-full"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {/* TOGGLE DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* MAIN INNER */}
        <div className="p-10">

          <h1 className="text-2xl font-bold mb-6 dark:text-white">Liste des tâches</h1>

          {/* LOADING */}
          {loadingTasks && <p className="text-gray-500">Chargement...</p>}

          {/* TASKS LIST */}
          <div className="space-y-3 mb-6">
            {tasks.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 rounded-lg shadow border dark:bg-gray-800 dark:border-gray-700 bg-white"
              >
                <span className="font-medium dark:text-gray-200">{i + 1}. {t.title}</span>

                <button
                  onClick={() => toggleTask(t.id, !t.completed)}
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center
                    ${t.completed ? "bg-blue-500 border-blue-500" : "border-gray-400"}
                  `}
                >
                  {t.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth={3} strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* ADD TASK BUTTON */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
          >
            + Ajouter une tâche
          </button>

          {/* ADD FORM */}
          {showForm && (
            <form
              onSubmit={handleAddTask}
              className="mt-5 space-y-4 p-6 rounded-lg shadow bg-white dark:bg-gray-800 border dark:border-gray-700"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <textarea
                name="details"
                rows={3}
                placeholder="Details"
                value={newTask.details}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>

              <select
                name="type"
                value={newTask.type}
                onChange={handleInputChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="Administrative">Administrative</option>
                <option value="Managerial">Managerial</option>
                <option value="other">Other</option>
              </select>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Enregistrer
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
