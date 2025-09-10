import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FavoriteButton } from "../components/FavoriteButton";

describe("FavoriteButton", () => {
  it("renders star border (empty star) when not favorite", () => {
    render(<FavoriteButton isFavorite={false} onToggle={() => {}} />);

    const starBorderIcon = screen.getByTestId("favorite-star-border");
    expect(starBorderIcon).toBeInTheDocument();
  });

  it("renders filled star when favorite", () => {
    render(<FavoriteButton isFavorite={true} onToggle={() => {}} />);

    const starIcon = screen.getByTestId("favorite-star-filled");
    expect(starIcon).toBeInTheDocument();
  });

  it("toggles icon when clicked", () => {
    let isFavorite = false;
    const mockOnToggle = () => {
      isFavorite = !isFavorite;
    };

    const { rerender } = render(
      <FavoriteButton isFavorite={isFavorite} onToggle={mockOnToggle} />
    );

    const starBorderIcon = screen.getByTestId("favorite-star-border");
    expect(starBorderIcon).toBeInTheDocument();

    fireEvent.click(starBorderIcon);

    rerender(
      <FavoriteButton isFavorite={isFavorite} onToggle={mockOnToggle} />
    );

    const starIcon = screen.getByTestId("favorite-star-filled");
    expect(starIcon).toBeInTheDocument();
  });
});
