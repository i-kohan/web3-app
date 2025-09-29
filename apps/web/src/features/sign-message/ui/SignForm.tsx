import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { useSignMessage } from "../model";

type Props = { onSigned: (message: string, signature: string) => void };

export function SignForm({ onSigned }: Props) {
  const [message, setMessage] = useState("");
  const signMessage = useSignMessage();

  async function handleSign() {
    const signature = await signMessage(message);
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
