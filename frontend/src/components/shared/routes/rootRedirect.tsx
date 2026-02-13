import { Navigate } from "react-router-dom";
import { useAppContext } from "../../../appContext/appContext";

export const RootRedirect = () => {
  const { auth } = useAppContext();
  const isAuth = auth?.data?.accessToken ?? null;
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // Jeśli zalogowany → dashboard
  // Jeśli NIE zalogowany → login
  return <Navigate to={isAuth ? "/dashboard" : "/login"} replace />;
};
