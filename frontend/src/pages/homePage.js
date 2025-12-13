import React from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Atelier/PutItAllTogether: Software architectures and middlewares in NodeJS
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to the Todo Application
        </h2>
      </header>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-md">
        <button
          type="button"
          onClick={() => handleNavigation("/authenticate")}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign into your account
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("/register")}
          className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Register for an account
        </button>

        <a
          href="https://todo-complet.onrender.com/auth/google"
          className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 transition-colors"
        >
          Se connecter avec Google
        </a>
      </div>

      {/* About Section */}
      <section className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Welcome! This application is about ...
        </h2>
        <a
          href="/userCancel"
          className="inline-block mt-4 rounded-2xl bg-green-600 px-6 py-2 text-white hover:bg-green-700 transition-colors"
        >
          Go Home
        </a>
      </section>
    </div>
  );
}
