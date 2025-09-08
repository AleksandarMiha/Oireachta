import type { BillTypeFilter } from "../../hooks/queries/useLegislation/useLegislation.types";

export const ALL_LEGISLATION = "AllLegislation";
export const FAVORITES = "Favorites";
export const PAGINATION_LIMIT = 10;
export const PAGINATION_SKIP = 0;

export const billTypeFilterData: BillTypeFilter[] = [
  "All",
  "Public",
  "Private",
];
export const BILL_TYPE_FILTER_ALL = "All";
