import { lazy, ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Loading from "../Loading/Loading";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { generateRoutes } from "../../../utils";
import RootLayout from "./RootLayout";
const DashboardLayout = lazy(() => import("./DashboardLayout"));
const DashboardPage = lazy(() => import("../../Panel/Dashboard/Dashboard"));
const CalendarPage = lazy(() => import("../../Calendar/Calendar"));

const routes: any[] = [
  {
    route: {
      path: "/dashboard",
    },
    component: DashboardPage,
  },
  {
    route: {
      path: "/calendar",
    },
    component: CalendarPage,
  },
];

const lazyLoad = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
): ReactNode => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const dashboardRoutes = {
  element: <ProtectedRoute>{lazyLoad(DashboardLayout)}</ProtectedRoute>,
  children:
    // routes.map((item) =>
    //   generateRoutes(item.route.path, lazyLoad(item.component)),
    // ),
    [
      {
        path: "dashboard",
        element: lazyLoad(DashboardPage),
      },
      {
        path: "calendar",
        element: lazyLoad(CalendarPage),
      },
    ],
};
