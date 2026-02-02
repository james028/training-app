import React, { Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import "./i18n/i18n";

import ContextProvider from "./appContext/appContext";
import Loading from "./components/shared/Loading/Loading";
import { rootRoute } from "./components/shared/routes/rootRoute";
import { authRoutes } from "./components/shared/routes/authRoutes";
import { dashboardRoutes } from "./components/shared/routes/dashboardRoutes";
import { RootRedirect } from "./components/shared/routes/rootRedirect";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/login" replace />,
//   },
//
//   {
//     element: <PublicLayout />,
//     children: [
//       {
//         path: "/login",
//         element: (
//           <PublicRoute>
//             <LoginPage />
//           </PublicRoute>
//         ),
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//     ],
//   },
//   {
//     element: (
//       <ProtectedRoute>
//         <RootLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "/calendar",
//         element: <Calendar />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    ...rootRoute,
    children: [
      // {
      //   index: true,
      //   element: <RootRedirect />, // ← "/" → login lub dashboard
      // },
      //...rootRoute.children,
      authRoutes,
      dashboardRoutes,
      //workoutRoutes,
      //socialRoutes,
      //settingsRoutes,
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
