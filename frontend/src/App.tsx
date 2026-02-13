import React, { Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";

import ContextProvider from "./appContext/appContext";
import Loading from "./components/shared/Loading/Loading";
import { rootRoute } from "./components/shared/routes/rootRoute";
import { getAuthRoutes } from "./components/shared/routes/childrenRoutes/authRoutes";
import { getDashboardRoutes } from "./components/shared/routes/childrenRoutes/dashboardRoutes";

const router = createBrowserRouter([
  {
    ...rootRoute,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      getAuthRoutes(),
      getDashboardRoutes(),
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </Suspense>

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
    </ContextProvider>
  );
}

export default App;
