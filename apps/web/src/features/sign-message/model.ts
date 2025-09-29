export async function signMessage(message: string): Promise<string> {
  const hex = Array.from(new TextEncoder().encode(message))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return "0x" + hex.slice(0, 10);
}
