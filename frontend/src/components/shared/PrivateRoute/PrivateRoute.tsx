import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../../appContext/appContext";

// @ts-ignore
const PrivateRoute = ({ children }) => {
  const { user } = useAppContext();
  const isLoggedIn = Object.keys(user ?? {}).length > 0;

  return (
    <div
    ///{...rest}
    // @ts-ignore
    // element={(props) => {
    //   return isLoggedIn ? (
    //     <Component {...props} />
    //   ) : (
    //     <Route path="/login" element={<Login />} />
    //   );
    // }}
    >
      {isLoggedIn ? children : <Navigate to="/login" />}
    </div>
  );
};

export default PrivateRoute;
