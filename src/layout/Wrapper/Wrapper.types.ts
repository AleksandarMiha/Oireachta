import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};
