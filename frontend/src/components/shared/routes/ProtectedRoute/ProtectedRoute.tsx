import React from "react";
import { useAppContext } from "../../../../appContext/appContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { auth } = useAppContext();
  const isAuth = auth?.data?.id;

  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
