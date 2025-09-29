import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

type Props = { onSigned: (message: string, signature: string) => void };

export function SignForm({ onSigned }: Props) {
  const [message, setMessage] = useState("");

  async function handleSign() {
    const signature = "0xFAKE";
    onSigned(message, signature);
  }

  return (
    <div>
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleSign} disabled={!message}>
        Sign
      </Button>
    </div>
  );
}
