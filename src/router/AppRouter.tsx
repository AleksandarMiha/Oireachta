import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout.component";
import { Wrapper } from "../layout/Wrapper/Wrapper.component";
import { ProtectedRoute } from "./ProtectedRoute";
import { routes } from "./routes.constants";

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <Wrapper sx={{ alignItems: "center" }}>
          <CircularProgress />
        </Wrapper>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, Component, permission }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  element={<Component />}
                  permission={permission}
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
