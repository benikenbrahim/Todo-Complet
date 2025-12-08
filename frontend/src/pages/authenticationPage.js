import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AuthenticationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(" https://render.com/docs/web-services#port-binding/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse backend :", data);
        if (data.message === "User logged in successfully") {
          navigate("/Dashboard");
        } else {
          alert("Identifiants incorrects");
        }
      })
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Atelier/PutItAllTogether: Software architectures and middlewares in NodeJS
        </h1>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          User Authentication Page
        </h3>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
