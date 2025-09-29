import { useCallback, useEffect, useMemo, useState } from "react";
import { getJSON, setJSON } from "@/shared/lib/storage";
import type { HistoryItem } from "./types";
import type { SignatureResult } from "../signature/types";

const STORAGE_KEY = "sig-history:v1";
const MAX_ITEMS = 50;

function hydrate(): HistoryItem[] {
  return getJSON<HistoryItem[]>(STORAGE_KEY, []);
}

function persist(items: HistoryItem[]) {
  setJSON(STORAGE_KEY, items.slice(0, MAX_ITEMS));
}

function makeItem(
  message: string,
  signature: string,
  result: SignatureResult,
  id: number
): HistoryItem {
  return { id, ts: Date.now(), message, signature, result };
}

function dedup(items: HistoryItem[]): HistoryItem[] {
  const seen = new Set<string>();
  const out: HistoryItem[] = [];
  for (const it of items) {
    const key = `${it.message}::${it.signature}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(hydrate());
  }, []);

  const add = useCallback(
    (message: string, signature: string, result: SignatureResult) => {
      setItems((curr) => {
        const next = dedup([
          makeItem(message, signature, result, curr.length + 1),
          ...curr,
        ]).slice(0, MAX_ITEMS);
        persist(next);
        return next;
      });
    },
    []
  );

  const clear = useCallback(() => {
    persist([]);
    setItems([]);
  }, []);

  const remove = useCallback((id: number) => {
    setItems((curr) => {
      const next = curr.filter((i) => i.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const actions = useMemo(() => ({ add, clear, remove }), [add, clear, remove]);

  return [items, actions] as const;
}
