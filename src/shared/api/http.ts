import type { ApiErrorResponse } from "../../../shared/http";

interface ApiError {
  message: string;
  status?: number;
}

export const getJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw <ApiError>{
      message: "Failed to parse JSON response",
      status: response.status,
    };
  }

  if (!response.ok) {
    const errorMessage =
      (payload as ApiErrorResponse).error ||
      `Request failed with status ${response.status}`;
    throw <ApiError>{ message: errorMessage, status: response.status };
  }

  return payload as T;
};

export const postJson = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody
): Promise<TResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw <ApiError>{
      message: "Failed to parse JSON response",
      status: response.status,
    };
  }

  if (!response.ok) {
    const errorMessage =
      (payload as ApiErrorResponse).error ||
      `Request failed with status ${response.status}`;
    throw <ApiError>{ message: errorMessage, status: response.status };
  }

  return payload as TResponse;
};
