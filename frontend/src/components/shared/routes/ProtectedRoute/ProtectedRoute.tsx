import React from "react";
import { useAppContext } from "../../../../appContext/appContext";
import { Navigate, useLocation } from "react-router-dom";
import { useValidateToken } from "../../../../hooks/useValidateToken/useValidateToken";
import { useLocalStorage } from "../../../../hooks/useLocalStorage/useLocalStorage";
import Loading from "../../Loading/Loading";

const ProtectedRoute = ({ children }: any) => {
  //const { auth } = useAppContext();
  //const isAuth = auth?.data?.id;

  const location = useLocation();

  const [auth, , removeAuth] = useLocalStorage("jwt");
  const token = auth?.data?.accessToken;

  const { isValid, isLoading } = useValidateToken(token || null);

  if (isLoading) {
    return <Loading />;
  }

  if (!auth || !isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if (!auth || !isValid) {
  //   removeAuth(); // 🔥 tutaj czyścisz token
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
