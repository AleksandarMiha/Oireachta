import { Navigate } from "react-router-dom";
import { defaultFallbackUrl } from "./routes.constants";
import type { ProtectedRouteProps } from "./routes.types";

export function ProtectedRoute({
  element,
  permission,
  fallbackUrl,
}: ProtectedRouteProps) {
  // TODO: inside user context or user store, add function hasPermission
  // hasPermission: ({permissions}) => permissions.includes(permission)
  // or if don't use permissions just token based auth
  // depending on auth strategy implement different logic

  if (!permission) {
    return element;
  }

  return <Navigate to={fallbackUrl ?? defaultFallbackUrl} replace />;
}
