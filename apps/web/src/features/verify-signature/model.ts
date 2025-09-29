import { verifySignature } from "@/shared/api/signature.api";

export async function verify(message: string, signature: string) {
  return verifySignature(message, signature);
}
