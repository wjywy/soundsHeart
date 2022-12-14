import React from "react";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
export default function useLazy(Component:any) {
  const Lazy = lazy(() => Component);
  return (props: any) => (
    <Suspense fallback={<Spin />}>
      <Lazy {...props} />
    </Suspense>
  );
}
