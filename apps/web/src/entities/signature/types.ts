export type SignatureResult = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};
