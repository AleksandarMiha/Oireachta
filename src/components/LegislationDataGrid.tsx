import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import type { LegislationResultBill } from "../hooks/useLegislation";
import { FavoriteButton } from "./FavoriteButton";

type LegislationDataGridProps = {
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
};

export function LegislationDataGrid({
  filteredLegislation,
  favoriteLegislation,
  onFavoriteToggle,
  paginationModel,
  onPaginationChange,
  setSelectedLegislation,
  isLoading,
  rowCount,
  paginationMode,
}: LegislationDataGridProps) {
  const columns: GridColDef<LegislationResultBill>[] = useMemo(
    () => [
      {
        field: "billNo",
        headerName: "Bill number",
        flex: 1,
        valueGetter: (_, { bill }) => bill.billNo,
      },
      {
        field: "billType",
        headerName: "Bill type",
        flex: 1,
        valueGetter: (_, { bill }) => bill.billType,
      },
      {
        field: "status",
        headerName: "Bill status",
        flex: 1,
        valueGetter: (_, { bill }) => bill.status,
      },
      {
        field: "sponsor",
        headerName: "Sponsor",
        flex: 1.2,
        valueGetter: (_, { bill }) =>
          bill.sponsors?.length > 0
            ? bill.sponsors[0].sponsor.as.showAs
            : undefined,
      },
      {
        field: "Favorites",
        headerName: "",
        width: 70,
        renderCell: ({ row }) => (
          <FavoriteButton
            isFavorite={favoriteLegislation.some(
              (fav) => fav.bill.uri === row.bill.uri
            )}
            onToggle={() => {
              const isAlreadyFavorite = favoriteLegislation.some(
                (fav) => fav.bill.uri === row.bill.uri
              );
              onFavoriteToggle(row, isAlreadyFavorite);
            }}
          />
        ),
      },
    ],
    [favoriteLegislation, onFavoriteToggle]
  );

  return (
    <DataGrid
      data-testid="legislation-table"
      rows={filteredLegislation}
      columns={columns}
      getRowId={({ bill }) => bill.uri} // unique value for each row
      pageSizeOptions={[10, 20, 50]}
      paginationModel={{
        page: Math.floor(paginationModel.skip / paginationModel.limit),
        pageSize: paginationModel.limit,
      }}
      onPaginationModelChange={({ pageSize, page }) =>
        onPaginationChange(page, pageSize)
      }
      paginationMode={paginationMode}
      rowCount={rowCount}
      onRowClick={({ row }) => setSelectedLegislation(row)}
      loading={isLoading}
      disableColumnFilter // It could be props
      disableColumnSorting
      disableColumnMenu
    />
  );
}
