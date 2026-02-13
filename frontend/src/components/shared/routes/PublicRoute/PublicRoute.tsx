import React from "react";
import { useAppContext } from "../../../../appContext/appContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: any) => {
  const { auth } = useAppContext();
  const isAuth = auth?.data?.id;

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  //     </div>
  //   );
  // }

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
