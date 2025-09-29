import { useState, memo, useCallback } from "react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Loader2 } from "lucide-react";

type Props = {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
  logged: boolean;
};

export const SignForm = memo(function SignForm({
  onSubmit,
  disabled,
  logged,
}: Props) {
  const [message, setMessage] = useState("");

  const canSubmit = message.trim().length > 0 && !disabled;

  const handleSubmit = useCallback(
    (message: string) => {
      setMessage("");
      onSubmit(message);
    },
    [onSubmit]
  );

  if (!logged) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign & Verify</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You need to be logged in to sign messages. Click{" "}
            <strong>Connect Wallet</strong> to continue.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign & Verify</CardTitle>
        <CardDescription>
          Enter a message. We'll sign it with your wallet and verify on the
          backend.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-3 pt-4">
        <Textarea
          placeholder="Type your message here…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-28"
        />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit(message)} disabled={!canSubmit}>
            {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign & Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
