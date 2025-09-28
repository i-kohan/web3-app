export const DomainErrorCode = {
  MESSAGE_EMPTY: "MESSAGE_EMPTY",
  MESSAGE_TOO_LONG: "MESSAGE_TOO_LONG",
  SIGNATURE_NOT_HEX: "SIGNATURE_NOT_HEX",
  SIGNATURE_INVALID_LENGTH: "SIGNATURE_INVALID_LENGTH",
  ADDRESS_INVALID: "ADDRESS_INVALID",
  RECOVERY_FAILED: "RECOVERY_FAILED",
} as const;

export type DomainErrorCode =
  (typeof DomainErrorCode)[keyof typeof DomainErrorCode];

export type DomainError = {
  code: DomainErrorCode;
  message?: string;
};
