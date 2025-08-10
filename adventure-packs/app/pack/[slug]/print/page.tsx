"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getActivities, getBingo, byPack } from "@/lib/data";
import type { Activity, BingoItem, PackSlug } from "@/lib/schemas";
import { ns, useLocalStorage } from "@/hooks/useLocalStorage";

export default function PrintPackPage() {
  const params = useParams<{ slug: PackSlug }>();
  const slug = params.slug;

  const [activities, setActivities] = useState<Activity[]>([]);
  const [bingo, setBingo] = useState<BingoItem[]>([]);
  const [checkedActivities] = useLocalStorage<string[]>(ns(slug, "activitiesChecked"), []);

  useEffect(() => {
    (async () => {
      const [a, b] = await Promise.all([getActivities(), getBingo()]);
      setActivities(byPack(a, slug));
      setBingo(byPack(b, slug).slice(0, 10));
      setTimeout(() => window.print(), 400);
    })();
  }, [slug]);

  const selected = activities.filter((a) => checkedActivities.includes(a.activity_id));

  return (
    <main className="p-4 print:p-2 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Adventure Pack</h1>
      <p className="text-sm text-gray-600 mb-4">{slug === "fort_worden_shore" ? "Fort Worden Shore" : "Homebase Walkable"}</p>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Activities</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {selected.map((a) => (
            <li key={a.activity_id} className="rounded-xl border p-2 print:p-1">
              <div className="flex items-center justify-between"><strong>{a.title}</strong><span className="text-xs">{a.duration_min} min</span></div>
              <p className="text-sm">{a.instructions}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Bingo</h2>
        <div className="grid grid-cols-5 gap-1 print:gap-0.5">
          {bingo.map((b) => (
            <div key={b.bingo_id} className="border p-1 text-[11px] rounded print:rounded-none">
              <div className="font-medium">{b.label}</div>
              {b.safety_note && <div className="text-[10px] text-red-700">{b.safety_note}</div>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}