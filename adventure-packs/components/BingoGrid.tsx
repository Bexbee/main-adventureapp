"use client";

import { useMemo } from "react";
import type { BingoItem } from "@/lib/schemas";
import { useLocalStorage, ns } from "@/hooks/useLocalStorage";

interface BingoGridProps {
  packSlug: string;
  items: BingoItem[]; // first 10 items will be used
}

export default function BingoGrid({ packSlug, items }: BingoGridProps) {
  const firstTen = items.slice(0, 10);
  const [checked, setChecked] = useLocalStorage<string[]>(ns(packSlug, "bingoChecked"), []);

  const progress = useMemo(() => {
    if (firstTen.length === 0) return 0;
    const pct = Math.round((checked.filter((id) => firstTen.some((b) => b.bingo_id === id)).length / firstTen.length) * 100);
    return pct;
  }, [checked, firstTen]);

  function toggle(id: string) {
    setChecked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function reset() {
    setChecked([]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-700">Progress: {progress}%</div>
        <button onClick={reset} className="text-sm underline">Reset</button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {firstTen.map((b) => (
          <label key={b.bingo_id} className="rounded-xl border bg-white p-3 min-h-[90px] flex flex-col justify-between">
            <span className="text-sm font-medium">{b.label}</span>
            {b.safety_note && <span className="text-[11px] text-red-700">{b.safety_note}</span>}
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 self-end"
              checked={checked.includes(b.bingo_id)}
              onChange={() => toggle(b.bingo_id)}
              aria-label={`Check ${b.label}`}
            />
          </label>
        ))}
      </div>
      <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden" aria-hidden>
        <div className="h-full bg-emerald-600" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}