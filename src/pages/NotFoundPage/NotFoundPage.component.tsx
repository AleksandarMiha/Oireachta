import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { StyledContainer } from "./NotFoundPage.styled";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Legislation ( Home ) page
      </Button>
    </StyledContainer>
  );
}
