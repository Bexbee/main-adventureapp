"use client";

import { useMemo } from "react";
import type { Activity } from "@/lib/schemas";
import { useLocalStorage, ns } from "@/hooks/useLocalStorage";
import { CheckSquare, ListChecks } from "lucide-react";

interface ActivityListProps {
  packSlug: string;
  activities: Activity[];
  timeBudgetMin: number;
}

export default function ActivityList({ packSlug, activities, timeBudgetMin }: ActivityListProps) {
  const [checked, setChecked] = useLocalStorage<string[]>(ns(packSlug, "activitiesChecked"), []);

  const withinBudget = useMemo(() => {
    return activities
      .filter((a) => a.duration_min <= timeBudgetMin)
      .slice()
      .sort((a, b) => a.duration_min - b.duration_min);
  }, [activities, timeBudgetMin]);

  function toggle(id: string) {
    setChecked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function suggestPlan() {
    const chosen: string[] = [];
    let total = 0;
    for (const act of withinBudget) {
      if (total + act.duration_min <= timeBudgetMin) {
        chosen.push(act.activity_id);
        total += act.duration_min;
        if (chosen.length >= 4) break;
      }
    }
    setChecked(chosen);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">Time budget: {timeBudgetMin} min</p>
        <button
          onClick={suggestPlan}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <ListChecks size={16} /> Suggest a Plan
        </button>
      </div>
      <ul className="space-y-2">
        {withinBudget.map((a) => (
          <li key={a.activity_id} className="rounded-xl border bg-white p-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5"
                checked={checked.includes(a.activity_id)}
                onChange={() => toggle(a.activity_id)}
                aria-label={`Select ${a.title}`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{a.title}</h4>
                  <span className="text-xs text-gray-600">{a.duration_min} min</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{a.instructions}</p>
                <div className="text-xs text-gray-500 mt-2 flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1"><CheckSquare size={14} /> {a.category}</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100">{a.location_scope}</span>
                  {a.required_items && <span>Items: {a.required_items}</span>}
                  {a.ethics_safety && <span>Note: {a.ethics_safety}</span>}
                </div>
              </div>
            </label>
          </li>
        ))}
        {withinBudget.length === 0 && (
          <li className="text-sm text-gray-600">No activities fit this time budget.</li>
        )}
      </ul>
    </div>
  );
}