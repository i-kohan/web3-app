import { useConnectWithOtp } from "@dynamic-labs/sdk-react-core";
import { toast } from "sonner";

export function useEmailAuthentication() {
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp();

  const sendOtp = async (email: string) => {
    try {
      await connectWithEmail(email);
      toast.success("OTP sent to your email!", {
        description: "Check your inbox and enter the verification code",
      });
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Please try again";
      toast.error("Failed to send OTP", { description: message });
      return { success: false, error: message };
    }
  };

  const authenticate = async (otp: string) => {
    try {
      await verifyOneTimePassword(otp);
      toast.success("Successfully authenticated!", {
        description: "Your embedded wallet is ready",
      });
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid OTP";
      toast.error("Invalid OTP", {
        description: "Please check your code and try again",
      });
      return { success: false, error: message };
    }
  };

  return {
    sendOtp,
    authenticate,
  };
}
