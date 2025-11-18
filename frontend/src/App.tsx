import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";

import ContextProvider from "./appContext/appContext";
import Dashboard from "./components/Panel/Dashboard/Dashboard";
import Navbar from "./components/Panel/Navbar/Navbar";
import Register from "./components/Panel/RegisterPanel/Register/Register";
//import Login from "./components/Panel/RegisterPanel/Login/Login";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./components/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Trainings = lazy(() => import("./components/Trainings/Trainings"));
const Login = lazy(
  () => import("./components/Panel/RegisterPanel/Login/Login"),
);

function App() {
  //zrobić routing w taki sposób
  //dashboard

  // const trainingsRoutes = [
  //   { path: "trainings-test", link: "api/plank/test" },
  //   { path: "trainings", link: "api/plank" },
  // ].map(({ path, link }) => {
  //   return {
  //     path,
  //     element: <Trainings />,
  //     loader: async () => link,
  //     key: path, // 👈 stały key
  //   };
  // });

  const TrainingsElement = <Trainings />; // tworzysz element raz

  const trainingsRoutes = [
    {
      path: "/trainings",
      element: <Trainings />,
      loader: () => ({ link: "api/plank" }),
    },
    {
      path: "/trainings-test",
      element: <Trainings />,
      loader: () => ({ link: "api/plank/test" }),
    },
  ];

  const pages = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

  const children1 = pages.map((route: any) => {
    return {
      path: route.path,
      element: route.element,
    };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: null },
        { path: "/dashboard", element: <Dashboard /> }, //tu bedzie dashboard
        //...trainingsRoutes,
        ...pages,
        //...trainingsRoutes2,
      ],
    },
  ]);

  //console.log(router);

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
          {/*<RouterProvider router={router} />*/}
          <Navbar />
          {/*<RouterProvider router={router} />*/}
          <Routes>
            {/*<Route path="/" element={<Home />} />*/}
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
              // { path: "/trainings", link: "api/plank" },
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
                    ></ContextProvider>
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
