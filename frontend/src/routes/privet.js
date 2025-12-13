import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
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
