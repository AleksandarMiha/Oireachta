import type { LegislationResultBill } from "../../hooks/queries/useLegislation/useLegislation.types";

export type LegislationDataGridProps = {
  filteredLegislation: LegislationResultBill[];
  favoriteLegislation: LegislationResultBill[];
  onFavoriteToggle: (
    legislation: LegislationResultBill,
    isAlreadyFavorite: boolean
  ) => void;
  paginationModel: { limit: number; skip: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setSelectedLegislation: (legislation: LegislationResultBill | null) => void;
  isLoading: boolean;
  rowCount: number;
  paginationMode: "server" | "client";
  pageSizeOptions?: number[];
  disableColumnFilter?: boolean;
  disableColumnSorting?: boolean;
  disableColumnMenu?: boolean;
};
