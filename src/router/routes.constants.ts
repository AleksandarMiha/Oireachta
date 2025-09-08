import { lazy } from "react";
import type { Routes } from "./routes.types";

export const defaultFallbackUrl = "/";

const Legislation = lazy(
  () => import("../pages/Legislation/Legislation.component")
);
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage.component")
);

export const routes: Routes[] = [
  {
    path: "/",
    Component: Legislation,
    // permission: "can-view-legislation-page", // example to protect route based on permission
    // children: [], // example of nested routes
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
];
