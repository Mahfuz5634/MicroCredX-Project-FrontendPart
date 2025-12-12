import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Authcontext } from "../ContextApi/AuthContext";
import ScaleLoader from "react-spinners/ScaleLoader";



const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(Authcontext);
  const location = useLocation();
  
   

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