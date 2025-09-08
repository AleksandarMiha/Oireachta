import { Box, FormControl, Typography, styled } from "@mui/material";

export const StyledErrorTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  marginLeft: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const StyledFormControl = styled(FormControl)({
  minWidth: 220,
});
