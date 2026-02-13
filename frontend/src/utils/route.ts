import { lazy, Suspense, ComponentType, ReactElement } from "react";

interface RouteConfig {
  path: string;
  component: () => Promise<{ default: ComponentType<any> }>;
  loader?: any;
}

export const generateRoutes = (routes: any[], element: React.ReactNode) => {
  return routes.map(
    ({
      path,
      //component
      loader,
    }) => {
      return {
        path,
        element,
        ...(loader && { loader }),
      };
    },
  );
};
//
// element: (
//     <Suspense fallback={<PageLoader />}>
// {lazy(component)()}
// </Suspense>
// ),
