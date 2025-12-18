import React from "react";
import { useAppContext } from "../../../appContext/appContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: any) => {
  const { auth } = useAppContext();
  const isAuth = auth?.data?.id;

  return !isAuth ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
