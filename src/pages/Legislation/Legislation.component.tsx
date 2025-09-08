import { InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";
import { BillDetailsDialog } from "../../components/BillDetailsDialog/BillDetailsDialog.component";
import { CustomTabs } from "../../components/CustomTabs/CustomTabs.component";
import { LegislationDataGrid } from "../../components/LegislationDataGrid/LegislationDataGrid.component";
import { useLegislationQuery } from "../../hooks/queries/useLegislation/useLegislation.hook";
import type {
  BillTypeFilter,
  LegislationResultBill,
} from "../../hooks/queries/useLegislation/useLegislation.types";
import { filterLegislationByBillType } from "../../utils/filterLegislationByBillType.ts";
import {
  ALL_LEGISLATION,
  BILL_TYPE_FILTER_ALL,
  billTypeFilterData,
  FAVORITES,
  PAGINATION_LIMIT,
  PAGINATION_SKIP,
} from "./Legislation.constants";
import {
  StyledErrorTypography,
  StyledFormControl,
  StyledHeaderBox,
} from "./Legislation.styled";
import type { PaginationModel, TableTab } from "./Legislation.types";

export default function Legislation() {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    limit: PAGINATION_LIMIT,
    skip: PAGINATION_SKIP,
  });
  const [favoriteLegislation, setFavoriteLegislation] = useState<
    LegislationResultBill[]
  >([]);
  const [selectedLegislation, setSelectedLegislation] =
    useState<LegislationResultBill | null>(null);
  const [selectedTableTab, setSelectedTableTab] =
    useState<TableTab>(ALL_LEGISLATION);
  const [billTypeFilter, setBillTypeFilter] =
    useState<BillTypeFilter>(BILL_TYPE_FILTER_ALL);

  const legislationQueryParams = useMemo(() => {
    return {
      limit: paginationModel.limit,
      skip: paginationModel.skip,
    };
  }, [paginationModel.limit, paginationModel.skip]);

  const useLegislation = useLegislationQuery(legislationQueryParams);

  const filteredLegislation = useMemo(() => {
    const legislationData =
      selectedTableTab === FAVORITES
        ? favoriteLegislation
        : (useLegislation.data?.results ?? []);

    return filterLegislationByBillType(legislationData, billTypeFilter);
  }, [
    useLegislation.data?.results,
    selectedTableTab,
    favoriteLegislation,
    billTypeFilter,
  ]);

  if (useLegislation.isError)
    return (
      <StyledErrorTypography color="error">
        Error while fetching legislation details
      </StyledErrorTypography>
    );

  return (
    <>
      <StyledHeaderBox>
        <CustomTabs
          value={selectedTableTab}
          onChange={(tab: TableTab) => {
            setSelectedTableTab(tab);
            setPaginationModel({ limit: paginationModel.limit, skip: 0 });
          }}
          tabs={[
            { value: ALL_LEGISLATION, label: "All legislation" },
            {
              value: FAVORITES,
              label: `Favorites (${
                filterLegislationByBillType(favoriteLegislation, billTypeFilter)
                  .length
              })`,
            },
          ]}
        />

        <StyledFormControl size="small">
          <InputLabel id="bill-type-label">Bill type</InputLabel>
          <Select
            labelId="bill-type-label"
            label="Bill type"
            value={billTypeFilter}
            onChange={(e) => {
              setBillTypeFilter(e.target.value);
              setPaginationModel({
                limit: paginationModel.limit,
                skip: 0,
              });
            }}
          >
            {billTypeFilterData.map((billTypeFilter) => (
              <MenuItem key={billTypeFilter} value={billTypeFilter}>
                {billTypeFilter}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </StyledHeaderBox>

      <LegislationDataGrid
        filteredLegislation={filteredLegislation}
        favoriteLegislation={favoriteLegislation}
        onFavoriteToggle={(legislation, isAlreadyFavorite) =>
          setFavoriteLegislation((prev) => {
            return isAlreadyFavorite
              ? prev.filter((fav) => fav.bill.uri !== legislation.bill.uri)
              : [...prev, legislation];
          })
        }
        paginationModel={paginationModel}
        onPaginationChange={(page, pageSize) =>
          setPaginationModel({
            limit: pageSize,
            skip: page * pageSize,
          })
        }
        setSelectedLegislation={setSelectedLegislation}
        isLoading={useLegislation.isLoading}
        rowCount={
          selectedTableTab === FAVORITES
            ? filteredLegislation.length
            : (useLegislation.data?.head.counts.billCount ?? 0)
        }
        paginationMode="server"
      />

      {selectedLegislation !== null && (
        <BillDetailsDialog
          legislationResult={selectedLegislation}
          onClose={() => setSelectedLegislation(null)}
        />
      )}
    </>
  );
}
