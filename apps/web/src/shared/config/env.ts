export const env = {
  API_URL: (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000",
  DYNAMIC_ENV_ID: (import.meta.env.VITE_DYNAMIC_ENV_ID as string) ?? "",
} as const;
