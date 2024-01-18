import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import "./i18n/i18n";

const Home = lazy(() => import("./components/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Trainings = lazy(() => import("./components/Trainings/Trainings"));

function App() {
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
