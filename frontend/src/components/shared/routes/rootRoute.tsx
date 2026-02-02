import { Navigate } from "react-router-dom";
import PublicLayout from "./RootLayout";
import ErrorPage from "../../../pages/ErrorPage";
import NotFoundPage from "../../../pages/NotFoundPage";

export const rootRoute = {
  path: "/",
  element: <PublicLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};
