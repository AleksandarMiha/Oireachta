import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";
import {
  FAVORITE_STAR_BORDER_TESTID,
  FAVORITE_STAR_FILLED_TESTID,
} from "./FavoriteButton.constants";
import type { FavoriteButtonProps } from "./FavoriteButton.types";

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {isFavorite ? (
        <Star data-testid={FAVORITE_STAR_FILLED_TESTID} />
      ) : (
        <StarBorder data-testid={FAVORITE_STAR_BORDER_TESTID} />
      )}
    </IconButton>
  );
}
