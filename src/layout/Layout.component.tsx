import { Outlet } from "react-router-dom";
import { Wrapper } from "./Wrapper/Wrapper.component";

export function Layout() {
  return (
    <Wrapper>
      {/* place for header */}
      <Outlet />
      {/* place for footer */}
    </Wrapper>
  );
}
