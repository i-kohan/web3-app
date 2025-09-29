export type HistoryItem = {
  id: number;
  ts: number;
  message: string;
  signature: string;
  result: {
    isValid: boolean;
    signer: string | null;
    originalMessage: string;
  };
};
