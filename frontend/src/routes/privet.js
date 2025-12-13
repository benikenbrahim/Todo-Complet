import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("https://todo-complet.onrender.com/auth/me", {
      credentials: "include" // 🔥 très important
    })
      .then(res => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <p>Chargement...</p>;
  }

  return isAuth ? children : <Navigate to="/authenticate" replace />;
};

export default PrivateRoute;
