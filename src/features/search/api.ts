import { postJson } from "../../shared/api/http";

import type {
  SearchRequestBody,
  SearchSuccessResponse,
} from "../../../shared/http";

export const searchFaqs = async (
  query: string
): Promise<SearchSuccessResponse> => {
  const body: SearchRequestBody = { query };

  return postJson<SearchSuccessResponse, SearchRequestBody>(
    "/api/search",
    body
  );
};
