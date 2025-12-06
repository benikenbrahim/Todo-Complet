import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormTodo({ newTask, handleInputChange, handleAddTask, setShowForm }) {
  const [showForm, setLocalShowForm] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setLocalShowForm((prev) => !prev);
    setShowForm((prev) => !prev);
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* 🔘 Bouton Add Task */}
      <button
        onClick={toggleForm}
        aria-expanded={showForm}
        aria-controls="task-form"
        className="
          flex items-center gap-2 px-4 py-2 
          bg-[#222633] hover:bg-[#32384d] 
          rounded-md text-white font-medium 
          transition-colors duration-200
        "
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span>Add New Task</span>
      </button>

      {/* 🧾 Formulaire */}
      {showForm && (
        <div
          id="task-form"
          className="
            mt-6 bg-[#1a1f2c] border border-[#2b3245] 
            shadow-md rounded-xl p-6 text-white 
            animate-fadeIn
          "
        >
          <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>

          <form onSubmit={handleAddTask} className="space-y-4">

            {/* 🔹 Title */}
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                value={newTask.title}
                onChange={handleInputChange}
                className="
                  w-full bg-[#0f1320] border border-[#2b3245]
                  rounded-md px-3 py-2 focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            {/* 🔹 Details */}
            <div>
              <label className="block text-sm mb-1">Details</label>
              <textarea
                name="details"
                rows="3"
                value={newTask.details}
                onChange={handleInputChange}
                className="
                  w-full bg-[#0f1320] border border-[#2b3245]
                  rounded-md px-3 py-2 focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  resize-none
                "
              ></textarea>
            </div>

            {/* 🔹 Type */}
            <div>
              <label className="block text-sm mb-1">Type</label>
              <select
                name="type"
                required
                value={newTask.type}
                onChange={handleInputChange}
                className="
                  w-full bg-[#0f1320] border border-[#2b3245]
                  rounded-md px-3 py-2 focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              >
                <option value="Administrative">Administrative</option>
                <option value="managerial">Managerial</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* 🟢 Submit */}
            <button
              type="submit"
              className="
                bg-green-600 hover:bg-green-700 
                text-white px-4 py-2 
                rounded-md font-medium 
                transition
              "
            >
              Save Task
            </button>

          </form>
        </div>
      )}
    </div>
  );
}
