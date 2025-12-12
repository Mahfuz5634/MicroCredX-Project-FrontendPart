import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Authcontext } from "../ContextApi/AuthContext";
import ScaleLoader from "react-spinners/ScaleLoader";



const PrivateRoute = ({ children }) => {
  const { user } = useContext(Authcontext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
  
      return () => clearTimeout(timer);
    }, []);

 if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <ScaleLoader color="#2cc786" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;