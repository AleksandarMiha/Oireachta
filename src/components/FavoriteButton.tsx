import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {isFavorite ? (
        <Star data-testid="favorite-star-filled" />
      ) : (
        <StarBorder data-testid="favorite-star-border" />
      )}
    </IconButton>
  );
}
