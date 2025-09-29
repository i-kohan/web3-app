export type Envelope<D> =
  | { ok: true; data: D }
  | { ok: false; error: { code?: string; message?: string } };

export function unwrap<D>(env: Envelope<D>): D {
  if (env && "ok" in env && env.ok) return env.data;

  const msg = env?.error?.message || env?.error?.code || "Request failed";

  throw new Error(msg);
}
