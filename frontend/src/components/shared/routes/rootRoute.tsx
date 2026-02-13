import PublicLayout from "./layouts/RootLayout";
import ErrorPage from "../../../pages/ErrorPage";
import NotFoundPage from "../../../pages/NotFoundPage";

export const rootRoute = {
  path: "/",
  element: <PublicLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};
