import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import type { SignatureResult } from "@/entities/signature/types";
import { shortenHex } from "@/shared/lib/format";

type Props = { result: SignatureResult | null };

export function VerifyPanel({ result }: Props) {
  if (!result) return null;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Verification</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <Badge variant={result.isValid ? "default" : "secondary"}>
            {result.isValid ? "valid" : "invalid"}
          </Badge>
        </div>
        <div className="text-sm">
          <span className="font-medium">Signer: </span>
          <span className="font-mono">
            {result.signer ? shortenHex(result.signer) : "—"}
          </span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Original message:</span>
          <pre className="mt-1 rounded-md bg-muted p-2 font-mono text-sm whitespace-pre-wrap">
            {result.originalMessage}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
