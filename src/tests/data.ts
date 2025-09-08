import type { OireachtasLegislationResponse } from "../hooks/queries/useLegislation/useLegislation.types";

export const mockLegislationResponse: OireachtasLegislationResponse = {
  head: {
    counts: {
      billCount: 100,
      resultCount: 2,
    },
  },
  results: [
    {
      bill: {
        billNo: "1",
        billType: "Public",
        billTypeURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-type/public",
        billYear: "2024",
        lastUpdated: "2024-01-01T00:00:00.000Z",
        longTitleEn: "Test Bill",
        longTitleGa: "Test Bill GA",
        method: "Presented",
        methodURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-method/presented",
        shortTitleEn: "Test Bill",
        shortTitleGa: "Test Bill GA",
        source: "Government",
        sourceURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-source/government",
        sponsors: [
          {
            sponsor: {
              as: { showAs: "Test Minister" },
              isPrimary: true,
            },
          },
        ],
        status: "Current",
        statusURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-status/current",
        uri: "https://data.oireachtas.ie/ie/oireachtas/bill/2024/1",
      },
      billSort: {
        billNoSort: 1,
        billShortTitleEnSort: "Test Bill",
        billShortTitleGaSort: "Test Bill GA",
        billYearSort: 2024,
      },
      contextDate: "2024-01-01",
    },
    {
      bill: {
        billNo: "2",
        billType: "Private",
        billTypeURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-type/private",
        billYear: "2024",
        lastUpdated: "2024-02-01T00:00:00.000Z",
        longTitleEn: "Private Test Bill",
        longTitleGa: "Private Test Bill GA",
        method: "Presented",
        methodURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-method/presented",
        shortTitleEn: "Private Test Bill",
        shortTitleGa: "Private Test Bill GA",
        source: "Private Member",
        sourceURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-source/private-member",
        sponsors: [
          {
            sponsor: {
              as: { showAs: "Test Deputy" },
              isPrimary: true,
            },
          },
        ],
        status: "Current",
        statusURI:
          "https://data.oireachtas.ie/ie/oireachtas/def/bill-status/current",
        uri: "https://data.oireachtas.ie/ie/oireachtas/bill/2024/2",
      },
      billSort: {
        billNoSort: 2,
        billShortTitleEnSort: "Private Test Bill",
        billShortTitleGaSort: "Private Test Bill GA",
        billYearSort: 2024,
      },
      contextDate: "2024-02-01",
    },
  ],
};
