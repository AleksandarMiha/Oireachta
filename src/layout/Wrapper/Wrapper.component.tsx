import { StyledWrapper } from "./Wrapper.styled";
import type { WrapperProps } from "./Wrapper.types";

export function Wrapper({ children, sx }: WrapperProps) {
  return <StyledWrapper sx={sx}>{children}</StyledWrapper>;
}
