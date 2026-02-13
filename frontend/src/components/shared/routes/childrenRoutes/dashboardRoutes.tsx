import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Loading from "../../Loading/Loading";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { lazyLoad } from "../utils/lazyLoad";
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
//const DashboardPage = lazy(() => import("../../../Panel/Dashboard/Dashboard"));

interface PageConfig {
  path: string;
  import: () => Promise<{ default: React.ComponentType<any> }>;
}
const dashboardPages: PageConfig[] = [
  {
    path: "dashboard",
    import: () => import("../../../Panel/Dashboard/Dashboard"),
  },
  { path: "calendar", import: () => import("../../../Calendar/Calendar") },
  ///other routes
];

export const getDashboardRoutes = (): RouteObject => ({
  element: (
    <ProtectedRoute>
      <Suspense fallback={<Loading />}>
        <DashboardLayout />
      </Suspense>
    </ProtectedRoute>
  ),
  children: dashboardPages.map(({ path, import: importFunc }) => ({
    path,
    element: lazyLoad(importFunc),
  })),
});
