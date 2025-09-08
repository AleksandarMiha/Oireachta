import type {
  BillTypeFilter,
  LegislationResultBill,
} from "../hooks/queries/useLegislation/useLegislation.types";
import { BILL_TYPE_FILTER_ALL } from "../pages/Legislation/Legislation.constants";

export function filterLegislationByBillType(
  legislation: LegislationResultBill[],
  billTypeFilter: BillTypeFilter
) {
  // if filter type is All (default) return all data without unnecessary filtering
  if (billTypeFilter === BILL_TYPE_FILTER_ALL) {
    return legislation;
  }

  return legislation.filter(({ bill }) => bill.billType === billTypeFilter);
}
