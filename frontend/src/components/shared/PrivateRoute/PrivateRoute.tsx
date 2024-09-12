import React from "react";
import { Route } from "react-router-dom";
import Login from "../../Panel/RegisterPanel/Login/Login";
import Dashboard from "../../Panel/Dashboard/Dashboard";

// @ts-ignore
const PrivateRoute = ({ component: Component, element, ...rest }) => {
  const isLoggedIn = true;

  return (
    <Route
      {...rest}
      // @ts-ignore
      element={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Route path="/login" element={<Login />} />
        );
      }}
    >
      <Dashboard />
    </Route>
  );
};

export default PrivateRoute;
