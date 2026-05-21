import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useValidateToken } from "../../../../hooks/useValidateToken/useValidateToken";
import Loading from "../../Loading/Loading";

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const { isValid, isLoading } = useValidateToken();

  if (isLoading) {
    return <Loading />;
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
