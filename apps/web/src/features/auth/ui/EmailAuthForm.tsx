import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Loader2, Mail, Shield } from "lucide-react";
import { useEmailAuthentication } from "../model";

type AuthStep = "email" | "otp" | "loading";

export function EmailAuthForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { sendOtp, authenticate } = useEmailAuthentication();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const result = await sendOtp(email);

    if (result.success) {
      setStep("otp");
    }

    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsLoading(true);
    setStep("loading");

    const result = await authenticate(otp);

    if (result.success) {
      onClose?.();
    } else {
      setStep("otp");
      setOtp("");
    }

    setIsLoading(false);
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
  };

  if (step === "loading") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-medium">Setting up your wallet...</p>
              <p className="text-sm text-muted-foreground">
                This may take a moment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "otp") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Enter Verification Code</CardTitle>
          <CardDescription>
            We sent a 6-digit code to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="text-center text-lg tracking-widest font-mono"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Connect
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToEmail}
                disabled={isLoading}
                className="w-full"
              >
                Back to email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Connect with Email</CardTitle>
        <CardDescription>
          Enter your email to create or access your embedded wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            disabled={!email.trim() || isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue with Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
