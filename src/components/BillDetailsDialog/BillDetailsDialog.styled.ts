import { DialogTitle, IconButton, Typography, styled } from "@mui/material";

export const StyledDialogTitle = styled(DialogTitle)({
  margin: 0,
  padding: 16,
});

export const StyledBillNumberTypography = styled(Typography)({
  marginTop: 15,
  marginLeft: 15,
});

export const StyledCloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 10,
  top: 10,
});
