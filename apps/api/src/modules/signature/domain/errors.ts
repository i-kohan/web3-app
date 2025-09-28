export type DomainErrorCode =
  | "MESSAGE_EMPTY"
  | "MESSAGE_TOO_LONG"
  | "SIGNATURE_NOT_HEX"
  | "SIGNATURE_INVALID_LENGTH"
  | "ADDRESS_INVALID"
  | "RECOVERY_FAILED"
  | "SIGNER_MISMATCH";

export type DomainError = {
  code: DomainErrorCode;
  message?: string;
};
