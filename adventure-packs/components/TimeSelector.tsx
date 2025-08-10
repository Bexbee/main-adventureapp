"use client";

import { useEffect } from "react";
import { useLocalStorage, ns } from "@/hooks/useLocalStorage";
import { Timer } from "lucide-react";

interface TimeSelectorProps {
  packSlug: string;
  defaultMinutes?: number;
  onChange?: (minutes: number) => void;
}

const OPTIONS = [10, 30, 60, 120];

export default function TimeSelector({ packSlug, defaultMinutes = 30, onChange }: TimeSelectorProps) {
  const [minutes, setMinutes] = useLocalStorage<number>(ns(packSlug, "timeBudgetMinutes"), defaultMinutes);

  useEffect(() => {
    onChange?.(minutes);
  }, [minutes, onChange]);

  return (
    <div className="flex items-center gap-2">
      <Timer className="text-sky-600" aria-hidden />
      <span className="sr-only" id={`time-${packSlug}`}>Time budget</span>
      <div role="group" aria-labelledby={`time-${packSlug}`} className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setMinutes(opt)}
            className={`px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-sky-400 ${
              minutes === opt ? "bg-sky-600 text-white border-sky-600" : "bg-white hover:bg-gray-50"
            }`}
          >
            {opt} min
          </button>
        ))}
      </div>
    </div>
  );
}