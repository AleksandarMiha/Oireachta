import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import type { LegislationResultBill } from "../hooks/useLegislation";
import { CustomTabs } from "./CustomTabs";

const StyledDialogTitle = styled(DialogTitle)({
  margin: 0,
  padding: 16,
});

const StyledBillNumberTypography = styled(Typography)({
  marginTop: 15,
  marginLeft: 15,
});

const StyledCloseIconButton = styled(IconButton)({
  position: "absolute",
  right: 10,
  top: 10,
});

type BillDetailsDialogProps = {
  legislationResult: LegislationResultBill;
  onClose: () => void;
};

export function BillDetailsDialog({
  legislationResult,
  onClose,
}: BillDetailsDialogProps) {
  const [selectedLanguageTab, setSelectedLanguageTab] = useState<
    "English" | "Gaeilge"
  >("English");

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
      data-testid="bill-details-dialog"
    >
      <StyledDialogTitle>
        <CustomTabs
          value={selectedLanguageTab}
          onChange={setSelectedLanguageTab}
          tabs={[
            { value: "English", label: "English" },
            { value: "Gaeilge", label: "Gaeilge" },
          ]}
          data-testid="language-tabs"
        />
        <StyledBillNumberTypography>
          Bill number: {legislationResult.bill.billNo}
        </StyledBillNumberTypography>

        <StyledCloseIconButton
          aria-label="close"
          onClick={onClose}
          data-testid="close-button"
        >
          <CloseIcon />
        </StyledCloseIconButton>
      </StyledDialogTitle>
      <DialogContent dividers data-testid="bill-content">
        {selectedLanguageTab === "English" ? (
          <Typography
            data-testid="bill-details-dialog-english-content"
            dangerouslySetInnerHTML={{
              __html: legislationResult.bill.longTitleEn ?? "",
            }}
          />
        ) : (
          <Typography
            data-testid="bill-details-dialog-gaeilge-content"
            dangerouslySetInnerHTML={{
              __html: legislationResult.bill.longTitleGa ?? "",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
