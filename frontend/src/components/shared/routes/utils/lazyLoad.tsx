import { lazy, Suspense } from "react";
import Loading from "../../Loading/Loading";

export const lazyLoad = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
): React.ReactElement => {
  const Component = lazy(importFunc);
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};
