import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";

import ContextProvider from "./appContext/appContext";
import Dashboard from "./components/Panel/Dashboard/Dashboard";
import Navbar from "./components/Panel/Navbar/Navbar";
import Register from "./components/Panel/RegisterPanel/Register/Register";
import Login from "./components/Panel/RegisterPanel/Login/Login";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./components/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Trainings = lazy(() => import("./components/Trainings/Trainings"));

function App() {
  //zrobić routing w taki sposób
  //dashboard
  // const router = createBrowserRouter([{
  //     path: '/',
  //     element: <Home />,
  //     errorElement: <ErrorPage />,
  //     children: [{
  //         path: "/trainings", element: <Trainings />
  //     }],
  // }]);

  return (
    <div>
      <Suspense fallback={<div>Loading... </div>}>
        {/*<RouterProvider router={router} />*/}
        <ContextProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: "14px",
                padding: "10px 15px",
              },
            }}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                // path="/dashboard"
                // element={undefined}
                // component={<Dashboard />}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {[
              { path: "/trainings-test", link: "api/plank/test" },
              { path: "/trainings", link: "api/plank" },
            ].map((url) => {
              return (
                <Route
                  key={url.link}
                  path={url.path}
                  element={
                    <ContextProvider
                      value={{
                        //z tym coś zrobić, przenieść, inaczej
                        link: url.link,
                      }}
                    >
                      <Trainings link={url.link} />
                    </ContextProvider>
                  }
                />
              );
            })}
          </Routes>
        </ContextProvider>
      </Suspense>
    </div>
  );
}

export default App;
