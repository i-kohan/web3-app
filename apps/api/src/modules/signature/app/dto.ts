export type VerifySignatureDtoIn = {
  message: string;
  signature: string;
};

export type VerifySignatureDtoOut = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};
