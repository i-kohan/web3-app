export const shortenHex = (v: string, left = 6, right = 4) =>
  v && v.startsWith("0x") && v.length > left + right + 2
    ? `${v.slice(0, 2 + left)}…${v.slice(-right)}`
    : v;

export const formatTs = (ts: number) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ts));
