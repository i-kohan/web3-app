export const env = {
  API_URL: (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000",
} as const;
