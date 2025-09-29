import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function useSignMessage() {
  const { primaryWallet } = useDynamicContext();

  return async function signMessage(message: string): Promise<string> {
    const err = validateMessage(message);
    if (err) throw new Error(err);

    if (!primaryWallet) throw new Error("Wallet not connected");

    const sig = await primaryWallet.signMessage(message);

    if (!sig) throw new Error("Failed to sign message");

    return sig;
  };
}

export function validateMessage(msg: string, max = 10_000): string | null {
  if (!msg || msg.trim().length === 0) return "Message is empty";
  if (msg.length > max) return `Message is too long (>${max})`;
  return null;
}
