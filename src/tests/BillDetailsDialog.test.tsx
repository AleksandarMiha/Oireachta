import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BillDetailsDialog } from "../components/BillDetailsDialog/BillDetailsDialog.component";
import {
  BILL_DETAILS_DIALOG_CLOSE_BUTTON_TESTID,
  BILL_DETAILS_DIALOG_ENGLISH_CONTENT_TESTID,
  BILL_DETAILS_DIALOG_GAEILGE_CONTENT_TESTID,
} from "../components/BillDetailsDialog/BillDetailsDialog.constants";
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
      screen.getByTestId(BILL_DETAILS_DIALOG_ENGLISH_CONTENT_TESTID)
    ).toHaveTextContent(mockBill.bill.longTitleEn ?? "");

    fireEvent.click(screen.getByRole("tab", { name: "Gaeilge" }));

    expect(
      screen.getByTestId(BILL_DETAILS_DIALOG_GAEILGE_CONTENT_TESTID)
    ).toHaveTextContent(mockBill.bill.longTitleGa ?? "");

    expect(
      screen.queryByTestId(BILL_DETAILS_DIALOG_ENGLISH_CONTENT_TESTID)
    ).not.toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    render(
      <BillDetailsDialog legislationResult={mockBill} onClose={mockOnClose} />
    );

    fireEvent.click(
      screen.getByTestId(BILL_DETAILS_DIALOG_CLOSE_BUTTON_TESTID)
    );

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
