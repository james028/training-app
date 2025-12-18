import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { Toaster } from "react-hot-toast";
import "./i18n/i18n";

import ContextProvider from "./appContext/appContext";
import Dashboard from "./components/Panel/Dashboard/Dashboard";
import Calendar from "./components/Calendar/Calendar";
import RootLayout from "./components/Home";
import LoginPage from "./components/Panel/RegisterPanel/Login/LoginPage";
import RegisterPage from "./components/Panel/RegisterPanel/Register/RegisterPage";
import Loading from "./components/shared/Loading/Loading";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Panel/Navbar/Navbar";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/shared/PublicRoute/PublicRoute";

const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer style={{ padding: "1rem", background: "#eee" }}>
        &copy; 2025 My App
      </footer>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <RouterProvider router={router} />
        </ErrorBoundary>
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
