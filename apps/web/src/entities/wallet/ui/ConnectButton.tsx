import { Button } from "@/shared/ui/button";
import { useWallet } from "../model";
import {
  Wallet,
  Copy,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Circle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { EmailAuthForm } from "@/features/auth";
import { toast } from "sonner";
import { useState } from "react";

export function ConnectButton() {
  const { address, isConnected, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
  };

  if (!isConnected) {
    return (
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-0 border-0">
          <EmailAuthForm onClose={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-300 font-medium shadow-sm transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Circle className="h-2 w-2 fill-green-500 text-green-500" />
              <span className="text-sm font-mono">
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <div className="text-xs text-muted-foreground mb-1">
            Embedded Wallet
          </div>
          <div className="font-mono text-sm bg-muted px-2 py-1 rounded text-center">
            {address?.slice(0, 8)}...{address?.slice(-8)}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="cursor-pointer"
        >
          {copied ? (
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={disconnect}
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
