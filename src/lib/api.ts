import axios, { AxiosError } from "axios";

import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Global 401 interceptor — clears auth state on expired/invalid sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // Don't clear on login/register failures (those are expected 401s)
      const url = error.config?.url ?? "";
      if (!url.includes("/auth/login") && !url.includes("/auth/register")) {
        useAuthStore.getState().clearUser();
      }
    }
    return Promise.reject(error);
  },
);

/**
 * Standardized API error shape extracted from backend responses.
 */
export interface ApiError {
  message: string;
  statusCode: number;
}

/**
 * Extracts a user-friendly error from an Axios error response.
 */
export function extractApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return {
        message: "Unable to reach the server. Please check your connection.",
        statusCode: 0,
      };
    }

    const status = error.response.status;
    const message =
      (error.response.data as { message?: string })?.message ||
      getDefaultMessage(status);

    return { message, statusCode: status };
  }

  return { message: "An unexpected error occurred.", statusCode: 500 };
}

function getDefaultMessage(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Session expired. Please log in again.";
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
