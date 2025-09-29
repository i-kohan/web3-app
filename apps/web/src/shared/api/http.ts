import { env } from "../config/env";

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${env.API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  return res.json() as Promise<T>;
}
