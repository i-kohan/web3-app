import {
  MFAAction,
  useDynamicContext,
  useIsMfaRequiredForAction,
  usePromptMfaAuth,
} from "@dynamic-labs/sdk-react-core";

export function useSignMessage() {
  const { primaryWallet } = useDynamicContext();
  const isMfaRequired = useIsMfaRequiredForAction();
  const promptMfaAuth = usePromptMfaAuth();

  return async function signMessage(message: string): Promise<string> {
    const err = validateMessage(message);
    if (err) throw new Error(err);

    if (!primaryWallet) throw new Error("Wallet not connected");

    const needed = await isMfaRequired({ mfaAction: MFAAction.WalletWaasSign });

    if (needed) {
      await promptMfaAuth({ createMfaToken: true });
    }

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
