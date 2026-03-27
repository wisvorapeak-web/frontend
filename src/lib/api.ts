import { toast } from "sonner";

interface RequestOptions extends RequestInit {
  body?: any;
  retries?: number;
  silent?: boolean; // suppress toast errors
}

const API_URL = import.meta.env.VITE_API_URL || '';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

/**
 * Type-safe API request wrapper with:
 * - Auto JSON serialization
 * - Credentials (cookies) included
 * - Auto-retry on network failures
 * - 401 detection with session cleanup
 * - Toast error notifications (suppressible)
 */
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<T> {
  const { body, retries = MAX_RETRIES, silent = false, ...rest } = options;

  const headers = new Headers(options.headers || {});
  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...rest,
    headers,
    credentials: 'include',
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);

      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        const data = await response.json().catch(() => ({ error: 'Request failed' }));

        if (response.status === 401) {
          localStorage.removeItem('ascendix_user');
          if (!silent) toast.error("Session expired. Please login again.");
        } else if (response.status === 429) {
          if (!silent) toast.error("Too many requests. Please wait and try again.");
        } else {
          const errorMsg = data.error || data.message || "An unexpected error occurred.";
          if (!silent) toast.error(errorMsg);
        }
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      // Server errors (5xx) — retry
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json() as T;

    } catch (error: any) {
      lastError = error;

      // Only retry on network/server errors, not client errors
      if (error.message?.startsWith('HTTP ')) throw error;

      const isLastAttempt = attempt === retries;
      if (!isLastAttempt) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
        continue;
      }
    }
  }

  // All retries exhausted
  if (!silent) {
    toast.error("Network error. Please check your connection.");
  }
  throw lastError || new Error("Request failed after retries");
}

/**
 * Helper for paginated API responses.
 * Extracts `data` array from `{ data, pagination }` or returns raw array.
 */
export function extractPaginatedData<T>(response: any): { data: T[]; pagination?: any } {
  if (Array.isArray(response)) {
    return { data: response };
  }
  return {
    data: response.data || [],
    pagination: response.pagination
  };
}
