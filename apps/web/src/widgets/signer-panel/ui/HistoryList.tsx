import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/shared/ui/tooltip";
import { Copy, Trash2 } from "lucide-react";
import { shortenHex, formatTs } from "@/shared/lib/format";
import type { HistoryItem } from "@/entities/history/types";

type Props = {
  items: HistoryItem[];
  onClear: () => void;
  onRemove: (id: number) => void;
};

export function HistoryList({ items, onClear, onRemove }: Props) {
  if (!items.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No checks yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>History</CardTitle>
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="max-h-80">
          <ul className="divide-y">
            {items.map((it) => (
              <li key={it.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={it.result.isValid ? "default" : "secondary"}
                      >
                        {it.result.isValid ? "valid" : "invalid"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTs(it.ts)}
                      </span>
                    </div>
                    <div className="text-sm truncate">
                      <span className="font-medium">Signer: </span>
                      <span className="font-mono">
                        {it.result.signer ? shortenHex(it.result.signer) : "—"}
                      </span>
                    </div>
                    <div className="text-sm truncate">
                      <span className="font-medium">Message: </span>
                      <span className="font-mono">{it.message}</span>
                    </div>
                    <div className="text-sm truncate">
                      <span className="font-medium">Signature: </span>
                      <span className="font-mono">
                        {shortenHex(it.signature, 8, 6)}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              navigator.clipboard.writeText(it.signature)
                            }
                            aria-label="Copy signature"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy signature</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(it.id)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
