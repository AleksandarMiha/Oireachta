import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { useMemo, useState } from "react";
import { BillDetailsDialog } from "../components/BillDetailsDialog";
import { CustomTabs } from "../components/CustomTabs";
import { LegislationDataGrid } from "../components/LegislationDataGrid";
import {
  useLegislationQuery,
  type BillType,
  type LegislationResultBill,
} from "../hooks/useLegislation";

const StyledErrorTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  marginLeft: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)({
  minWidth: 220,
});

type PaginationModel = {
  limit: number;
  skip: number;
};

type TableTab = "AllLegislation" | "Favorites";

export function Legislation() {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    limit: 10,
    skip: 0,
  });
  const [favoriteLegislation, setFavoriteLegislation] = useState<
    LegislationResultBill[]
  >([]);
  const [selectedLegislation, setSelectedLegislation] =
    useState<LegislationResultBill | null>(null);
  const [selectedTableTab, setSelectedTableTab] =
    useState<TableTab>("AllLegislation");
  const [billTypeFilter, setBillTypeFilter] = useState<BillType>("Public");

  const legislationQueryParams = useMemo(() => {
    return {
      limit: paginationModel.limit,
      skip: paginationModel.skip,
    };
  }, [paginationModel.limit, paginationModel.skip]);

  const useLegislation = useLegislationQuery(legislationQueryParams);

  const filteredLegislation = useMemo(() => {
    const legislationResults =
      selectedTableTab === "Favorites"
        ? favoriteLegislation
        : (useLegislation.data?.results ?? []);

    return legislationResults.filter(
      ({ bill }) => bill.billType === billTypeFilter
    );
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
            { value: "AllLegislation", label: "All legislation" },
            {
              value: "Favorites",
              label: `Favorites (${favoriteLegislation.length})`,
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
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
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
          selectedTableTab === "Favorites"
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
