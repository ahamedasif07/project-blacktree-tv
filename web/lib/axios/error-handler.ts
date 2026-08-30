import { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Global API Error Handler
 * Extracts readable messages and shows toast notifications
 */
export const handleApiError = (error: AxiosError) => {
  const data = error.response?.data as Record<string, unknown> | undefined;
  const status = error.response?.status;
  
  // 1. Extract the best possible message
  let message = "Something went wrong. Please try again.";
  
  if (typeof data?.message === "string") {
    message = data.message;
  } else if (typeof data?.error === "string") {
    message = data.error;
  } else if (error.message) {
    message = error.message;
  }

  // 2. Handle validation errors specifically (e.g., from Zod or Backend validation)
  if (status === 422 || status === 400) {
    if (data?.errors && typeof data.errors === 'object') {
      const errorMessages = Object.values(data.errors).flat();
      if (errorMessages.length > 0) {
        errorMessages.forEach((msg) => toast.error(String(msg)));
        return "Validation Error";
      }
    }
  }

  // 3. Log for developers
  if (process.env.NODE_ENV === "development") {
    console.error("[API Error]:", {
      status,
      message,
      data,
    });
  }

  // 4. Show global toast notification (except for 401s which are handled by refresh logic)
  if (status !== 401) {
    toast.error(message, {
      description: status ? `Error Code: ${status}` : "Network Error",
    });
  }

  return message;
};
