import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import "./i18n/i18n";
import { AppContext } from "./appContext/appContext";
import Dashboard from "./components/Panel/Dashboard/Dashboard";
import Navbar from "./components/Panel/Navbar/Navbar";
import Register from "./components/Panel/RegisterPanel/Register/Register";
import Login from "./components/Panel/RegisterPanel/Login/Login";

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {[
            { path: "/trainings-test", link: "api/plank/test" },
            { path: "/trainings", link: "api/plank" },
          ].map((url) => {
            return (
              <Route
                key={url.link}
                path={url.path}
                element={
                  <AppContext.Provider
                    value={{
                      link: url.link,
                    }}
                  >
                    <Trainings />
                  </AppContext.Provider>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
