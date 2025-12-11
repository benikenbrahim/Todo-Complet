import { useState, useEffect } from "react";

export function Help() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/Dashboard", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-lg text-slate-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Date */}
        <div className="mb-6">
          <h4 className="text-gray-700 text-lg">
            Date : {new Date().toLocaleDateString()}
          </h4>
        </div>

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Help Page</h1>
        </div>

        {/* Content section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Welcome! This is Service of Help ...
          </h2>
          <a
            href="/userCancel"
            className="inline-block mt-4 rounded-2xl bg-green-600 px-6 py-2 text-white hover:bg-green-700 transition-colors"
          >
            Go Home
          </a>
        </section>
      </main>
    </div>
  );
}
