export function shortenHex(addr: string, prefix = 2, suffix = 4): string {
  return addr.slice(0, prefix) + "..." + addr.slice(-suffix);
}

export function formatTs(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
  });
}
