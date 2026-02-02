import { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";
import PublicRoute from "./PublicRoute/PublicRoute";
import { RouteObject } from "react-router-dom";
const AuthLayout = lazy(() => import("../routes/authLayout"));
const LoginPage = lazy(
  () => import("../../Panel/RegisterPanel/Login/LoginPage"),
);
const RegisterPage = lazy(
  () => import("../../Panel/RegisterPanel/Register/RegisterPage"),
);
// const ForgotPasswordPage = lazy(
//   () => import("@/pages/auth/ForgotPasswordPage"),
// );
// const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));

export const authRoutes: RouteObject = {
  element: (
    <PublicRoute>
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    </PublicRoute>
  ),
  children: [
    {
      path: "login",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      ),
    },
    // {
    //   path: "forgot-password",
    //   element: (
    //     <Suspense fallback={<PageLoader />}>
    //       <ForgotPasswordPage />
    //     </Suspense>
    //   ),
    // },
    // {
    //   path: "reset-password/:token",
    //   element: (
    //     <Suspense fallback={<PageLoader />}>
    //       <ResetPasswordPage />
    //     </Suspense>
    //   ),
    // },
  ],
};
