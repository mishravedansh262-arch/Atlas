import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Standardized API error shape extracted from backend responses.
 * Backend always returns `{ success: false, message: string }` on errors.
 */
export interface ApiError {
  message: string;
  statusCode: number;
}

/**
 * Extracts a user-friendly error from an Axios error response.
 * Keeps raw stack traces / internal details away from the UI.
 */
export function extractApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 500;
    const message =
      (error.response?.data as { message?: string })?.message ||
      getDefaultMessage(status);

    return { message, statusCode: status };
  }

  // Network failure or unexpected throw
  if (error instanceof Error && error.message === "Network Error") {
    return {
      message: "Unable to reach the server. Please check your connection.",
      statusCode: 0,
    };
  }

  return { message: "An unexpected error occurred.", statusCode: 500 };
}

function getDefaultMessage(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Invalid credentials.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "A conflict occurred. The resource may already exist.";
    case 429:
      return "Too many requests. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}
