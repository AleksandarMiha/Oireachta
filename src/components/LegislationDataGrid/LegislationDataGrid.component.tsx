import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import type { LegislationResultBill } from "../../hooks/queries/useLegislation/useLegislation.types";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton.component";
import { LEGISLATION_TABLE_TESTID } from "./LegislationDataGrid.constants";
import type { LegislationDataGridProps } from "./LegislationDataGrid.types";

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
  pageSizeOptions = [10, 20, 50],
  disableColumnFilter = true,
  disableColumnSorting = true,
  disableColumnMenu = true,
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
          bill.sponsors?.[0]?.sponsor?.as?.showAs ?? undefined,
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
      data-testid={LEGISLATION_TABLE_TESTID}
      rows={filteredLegislation}
      columns={columns}
      getRowId={({ bill }) => bill.uri} // unique value for each row
      pageSizeOptions={pageSizeOptions}
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
      disableColumnFilter={disableColumnFilter}
      disableColumnSorting={disableColumnSorting}
      disableColumnMenu={disableColumnMenu}
    />
  );
}
