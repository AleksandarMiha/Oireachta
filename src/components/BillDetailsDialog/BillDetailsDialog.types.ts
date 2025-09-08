import type { LegislationResultBill } from "../../hooks/queries/useLegislation/useLegislation.types";

export type BillDetailsDialogProps = {
  legislationResult: LegislationResultBill;
  onClose: () => void;
};

export type SelectedLanguageTab = "English" | "Gaeilge";
