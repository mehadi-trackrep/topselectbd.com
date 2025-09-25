import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    
    // Try to parse as JSON first
    try {
      const json = JSON.parse(text);
      throw new Error(`${res.status}: ${json.message || text}`);
    } catch (e) {
      // If it's not JSON, it might be an HTML error page
      if (text.startsWith('<')) {
        throw new Error(`${res.status}: Server returned an HTML error page`);
      } else {
        throw new Error(`${res.status}: ${text || res.statusText}`);
      }
    }
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Use the API base URL from environment variables or default to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
  
  // If the URL is already absolute, use it as is
  // Otherwise, prepend the API base URL
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  console.log(`API Request: ${method} ${fullUrl}`);
  if (data) {
    console.log("Payload:", data);
  }

  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
