import { toast } from "sonner";

interface RequestOptions extends RequestInit {
  body?: any;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, ...rest } = options;
  const token = localStorage.getItem('ascendix_token');

  const headers = new Headers(options.headers || {});
  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...rest,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle unauthorized (401)
      if (response.status === 401) {
        localStorage.removeItem('ascendix_user');
        localStorage.removeItem('ascendix_token');
        // Optional: window.location.href = '/login';
        toast.error("Session expired. Please login again.");
      } else {
        const errorMsg = data.error || data.message || "An unexpected error occurred.";
        toast.error(errorMsg);
      }
      throw new Error(data.error || "API Error");
    }

    return data as T;
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      toast.error("Network error. Please check your connection.");
    }
    throw error;
  }
}
