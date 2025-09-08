import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import {
  OireachtasLegislationResponseSchema,
  type LegislationQueryParams,
  type OireachtasLegislationResponse,
} from "./useLegislation.types";

export function useLegislationQuery(params: LegislationQueryParams = {}) {
  return useQuery<OireachtasLegislationResponse>({
    queryKey: ["legislation", params],
    queryFn: async () => {
      const response = await axiosInstance.get(`/legislation`, {
        params,
        paramsSerializer: { indexes: null },
      });

      return OireachtasLegislationResponseSchema.parse(response.data);
    },
    placeholderData: keepPreviousData,
  });
}
