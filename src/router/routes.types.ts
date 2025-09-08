import type { ComponentType, LazyExoticComponent } from "react";
import type { RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  element: RouteProps["element"];
  permission?: string;
  fallbackUrl?: string;
};

export type Routes = {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
  permission?: string;
  children?: Routes[];
};
