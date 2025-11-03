import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import api from "../services/axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading, true/false after check

  useEffect(() => {
    api.get("/api/auth/check", { withCredentials: true })
      .then((res) => setIsAuth(res.data.isAuth))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
