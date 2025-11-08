import type { SearchResultItem } from "../../../shared/http";

interface SearchState {
  query: string;
  results: SearchResultItem[];
  summary?: string;
  sources: string[];
  infoMessage: string;
  errorMessage: string;
  isLoading: boolean;
  hasSearched: boolean;
}

export enum SearchActionType {
  SET_QUERY = "SET_QUERY",
  SEARCH_START = "SEARCH_START",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_ERROR = "SEARCH_ERROR",
  RESET_MESSAGES = "RESET_MESSAGES",
}

type SearchAction =
  | { type: SearchActionType.SET_QUERY; payload: string }
  | { type: SearchActionType.SEARCH_START }
  | {
      type: SearchActionType.SEARCH_SUCCESS;
      payload: {
        results: SearchResultItem[];
        summary?: string;
        sources: string[];
        message?: string;
      };
    }
  | { type: SearchActionType.SEARCH_ERROR; payload: string }
  | { type: SearchActionType.RESET_MESSAGES };

export const initialState: SearchState = {
  query: "",
  results: [],
  summary: undefined,
  sources: [],
  infoMessage: "",
  errorMessage: "",
  isLoading: false,
  hasSearched: false,
};

export function searchReducer(
  state: SearchState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case SearchActionType.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SearchActionType.SEARCH_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        infoMessage: "",
        summary: undefined,
        sources: [],
        results: [],
      };
    case SearchActionType.SEARCH_SUCCESS:
      return {
        ...state,
        results: action.payload.results ?? [],
        summary: action.payload.summary,
        sources: action.payload.sources ?? [],
        infoMessage:
          action.payload.message && action.payload.results.length === 0
            ? action.payload.message
            : !action.payload.results.length
            ? `No results found for "${state.query.trim()}".`
            : "",
        isLoading: false,
        hasSearched: true,
      };
    case SearchActionType.SEARCH_ERROR:
      return {
        ...state,
        results: [],
        errorMessage: action.payload,
        isLoading: false,
        hasSearched: true,
      };
    case SearchActionType.RESET_MESSAGES:
      return {
        ...state,
        errorMessage: "",
        infoMessage: "",
      };
    default:
      return state;
  }
}
