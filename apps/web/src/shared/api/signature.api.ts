import { request } from "./request";

export type SignatureResult = {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
};

export async function verifySignature(message: string, signature: string) {
  return request<SignatureResult>("/api/v1/verify-signature", {
    method: "POST",
    body: JSON.stringify({ message, signature }),
  });
}
