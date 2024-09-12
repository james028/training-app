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
import { useLocalStorage2, XXX } from "./hooks/useLocalStorage/useLocalStorage";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./components/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Trainings = lazy(() => import("./components/Trainings/Trainings"));

//zmiana nazwy fukncji
function getInitialState(key: string) {}

function App() {
  const { getItem: getItemJwt } = XXX("jwt");
  const [value] = useLocalStorage2("jwt");
  const [user, setUser] = React.useState<any>(() => {
    const localStorageValue = localStorage.getItem("jwt");
    //? JSON.parse(localStorage.getItem("jwt") || "{}")
    //: null,

    if (localStorageValue && localStorageValue !== "undefined") {
      return JSON.parse(localStorageValue);
    }
  });

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

  console.log(user, "uesssssssssssssss");

  return (
    <div>
      <Suspense fallback={<div>Loading... </div>}>
        {/*<RouterProvider router={router} />*/}
        <AppContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <PrivateRoute
              path="/dashboard"
              element={undefined}
              component={<Dashboard />}
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
        </AppContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
