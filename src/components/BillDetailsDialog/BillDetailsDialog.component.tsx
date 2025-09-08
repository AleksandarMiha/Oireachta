import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { CustomTabs } from "../CustomTabs/CustomTabs.component";
import {
  BILL_DETAILS_DIALOG_CLOSE_BUTTON_TESTID,
  BILL_DETAILS_DIALOG_ENGLISH_CONTENT_TESTID,
  BILL_DETAILS_DIALOG_GAEILGE_CONTENT_TESTID,
  ENGLISH,
  GAEILGE,
} from "./BillDetailsDialog.constants";
import {
  StyledBillNumberTypography,
  StyledCloseIconButton,
  StyledDialogTitle,
} from "./BillDetailsDialog.styled";
import type {
  BillDetailsDialogProps,
  SelectedLanguageTab,
} from "./BillDetailsDialog.types";

export function BillDetailsDialog({
  legislationResult,
  onClose,
}: BillDetailsDialogProps) {
  const [selectedLanguageTab, setSelectedLanguageTab] =
    useState<SelectedLanguageTab>(ENGLISH);

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <CustomTabs
          value={selectedLanguageTab}
          onChange={setSelectedLanguageTab}
          tabs={[
            { value: ENGLISH, label: ENGLISH },
            { value: GAEILGE, label: GAEILGE },
          ]}
        />
        <StyledBillNumberTypography>
          Bill number: {legislationResult.bill.billNo}
        </StyledBillNumberTypography>

        <StyledCloseIconButton
          aria-label="close"
          onClick={onClose}
          data-testid={BILL_DETAILS_DIALOG_CLOSE_BUTTON_TESTID}
        >
          <CloseIcon />
        </StyledCloseIconButton>
      </StyledDialogTitle>
      <DialogContent dividers>
        {selectedLanguageTab === ENGLISH ? (
          <Typography
            data-testid={BILL_DETAILS_DIALOG_ENGLISH_CONTENT_TESTID}
            dangerouslySetInnerHTML={{
              __html: legislationResult.bill.longTitleEn ?? "",
            }}
          />
        ) : (
          <Typography
            data-testid={BILL_DETAILS_DIALOG_GAEILGE_CONTENT_TESTID}
            dangerouslySetInnerHTML={{
              __html: legislationResult.bill.longTitleGa ?? "",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
