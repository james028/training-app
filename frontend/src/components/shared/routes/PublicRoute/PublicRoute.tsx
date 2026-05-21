import React from "react";
import { Navigate } from "react-router-dom";
import { useValidateToken } from "../../../../hooks/useValidateToken/useValidateToken";
import Loading from "../../Loading/Loading";

const PublicRoute = ({ children }: any) => {
  const { isValid, isLoading } = useValidateToken();

  if (isLoading) {
    return <Loading />;
  }

  if (isValid) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
