import { http } from "./http";
import { unwrap, type Envelope } from "./envelope";

export async function request<D>(
  path: string,
  options?: RequestInit
): Promise<D> {
  const env = await http<Envelope<D>>(path, options);
  return unwrap(env);
}
