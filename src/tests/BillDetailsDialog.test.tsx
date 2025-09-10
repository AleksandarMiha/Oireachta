import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BillDetailsDialog } from "../components/BillDetailsDialog";
import { mockLegislationResponse } from "./data";

describe("BillDetailsDialog", () => {
  const mockBill = mockLegislationResponse.results[0];
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("switches between language tabs correctly", () => {
    render(
      <BillDetailsDialog legislationResult={mockBill} onClose={mockOnClose} />
    );

    expect(
      screen.getByTestId("bill-details-dialog-english-content")
    ).toHaveTextContent(mockBill.bill.longTitleEn ?? "");

    fireEvent.click(screen.getByRole("tab", { name: "Gaeilge" }));

    expect(
      screen.getByTestId("bill-details-dialog-gaeilge-content")
    ).toHaveTextContent(mockBill.bill.longTitleGa ?? "");

    expect(
      screen.queryByTestId("bill-details-dialog-english-content")
    ).not.toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    render(
      <BillDetailsDialog legislationResult={mockBill} onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByTestId("close-button"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
