export interface ApiErrorResponse {
  error: string;
}

export interface HealthResponse {
  status: "ok";
  uptimeSeconds: number;
  timestamp: string;
  env: string;
}

export interface SearchRequestBody {
  query?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  snippet: string;
}

export interface SearchSuccessResponse {
  query: string;
  results: SearchResultItem[];
  summary?: string;
  sources?: string[];
  message?: string;
}
