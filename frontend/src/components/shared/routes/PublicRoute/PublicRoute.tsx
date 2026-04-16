import React from "react";
import { useAppContext } from "../../../../appContext/appContext";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../../../../hooks/useLocalStorage/useLocalStorage";
import { useValidateToken } from "../../../../hooks/useValidateToken/useValidateToken";
import Loading from "../../Loading/Loading";

const PublicRoute = ({ children }: any) => {
  //const { auth } = useAppContext();
  //const isAuth = auth?.data?.id;

  const [auth, , removeAuth] = useLocalStorage("jwt");
  const token = auth?.data?.accessToken;

  console.log(auth?.data, "auth");

  const { isValid, isLoading } = useValidateToken(token || null);

  if (auth?.data?.accessToken && isLoading) {
    // return (
    //   <div className="flex h-screen items-center justify-center">
    //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    //   </div>
    // );

    return <Loading />;
  }

  console.log(isValid, "isValid");
  if (auth?.data?.accessToken && isValid) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
