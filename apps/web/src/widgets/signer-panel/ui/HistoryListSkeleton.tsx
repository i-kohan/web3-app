import { Card, CardHeader, CardContent } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";

export function HistoryListSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-16" />
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-[480px]">
          <ul className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-12 rounded-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-24" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-32" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-18" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
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
