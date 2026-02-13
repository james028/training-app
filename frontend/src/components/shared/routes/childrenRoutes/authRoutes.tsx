import { RouteObject } from "react-router-dom";
import PublicRoute from "../PublicRoute/PublicRoute";
import { lazyLoad } from "../utils/lazyLoad";
import { Suspense } from "react";
import Loading from "../../Loading/Loading";
import AuthLayout from "../layouts/authLayout";

interface PageConfig {
  path: string;
  import: () => Promise<{ default: React.ComponentType<any> }>;
}

const authPages: PageConfig[] = [
  {
    path: "login",
    import: () => import("../../../Panel/RegisterPanel/Login/LoginPage"),
  },
  {
    path: "register",
    import: () => import("../../../Panel/RegisterPanel/Register/RegisterPage"),
  },
  // {
  //   path: "forgot-password",
  //   import: () => import("@/pages/auth/ForgotPasswordPage"),
  // },
];

export const getAuthRoutes = (): RouteObject => ({
  element: (
    <PublicRoute>
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    </PublicRoute>
  ),
  children: authPages.map(({ path, import: importFunc }) => ({
    path,
    element: lazyLoad(importFunc),
  })),
});
