"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TimeSelector from "@/components/TimeSelector";
import MapView from "@/components/MapView";
import PlaceList from "@/components/PlacePopup";
import ActivityList from "@/components/ActivityList";
import BingoGrid from "@/components/BingoGrid";
import Journal from "@/components/Journal";
import SafetyCard from "@/components/SafetyCard";
import { getActivities, getBingo, getPlaces, byPack } from "@/lib/data";
import type { Activity, BingoItem, PackSlug, Place } from "@/lib/schemas";
import Link from "next/link";
import { Map, ListChecks, Binary, NotebookPen, Info, Printer } from "lucide-react";

const TABS = ["Overview", "Map", "Activities", "Bingo", "Journal"] as const;

export default function PackPage() {
  const params = useParams<{ slug: PackSlug }>();
  const slug = params.slug;
  const router = useRouter();

  const [tab, setTab] = useState<string>("Overview");
  const [timeMin, setTimeMin] = useState(30);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [bingo, setBingo] = useState<BingoItem[]>([]);

  useEffect(() => {
    (async () => {
      const [p, a, b] = await Promise.all([getPlaces(), getActivities(), getBingo()]);
      setPlaces(byPack(p, slug));
      setActivities(byPack(a, slug));
      setBingo(byPack(b, slug));
    })();
  }, [slug]);

  const showMap = slug === "fort_worden_shore";

  const tabs: string[] = showMap ? [...TABS] as unknown as string[] : ["Overview", "Activities", "Bingo", "Journal"];
  const title = slug === "fort_worden_shore" ? "Fort Worden Shore Pack" : "Homebase Walkable";

  function printPack() {
    router.push(`/pack/${slug}/print`);
  }

  return (
    <main className="min-h-screen p-4 pb-24 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-600 mb-3">Replace with real data.</p>

      <div role="tablist" aria-label="Pack sections" className="flex gap-2 overflow-x-auto py-2">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 rounded-xl border text-sm whitespace-nowrap ${tab === t ? "bg-sky-600 text-white border-sky-600" : "bg-white"}`}
          >
            {t === "Overview" && <Info className="inline mr-1" size={16} />}
            {t === "Map" && <Map className="inline mr-1" size={16} />}
            {t === "Activities" && <ListChecks className="inline mr-1" size={16} />}
            {t === "Bingo" && <Binary className="inline mr-1" size={16} />}
            {t === "Journal" && <NotebookPen className="inline mr-1" size={16} />}
            {t}
          </button>
        ))}
        <button onClick={printPack} className="ml-auto px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm inline-flex items-center gap-2"><Printer size={16}/> Print this Pack</button>
      </div>

      {tab === "Overview" && (
        <section className="space-y-4">
          <TimeSelector packSlug={slug} onChange={setTimeMin} />
          {showMap ? (
            <SafetyCard slug={slug} />
          ) : (
            <div className="rounded-2xl border bg-white p-3">
              <h3 className="font-medium">Getting Started</h3>
              <p className="text-sm text-gray-700">Short neighborhood explorations without a car. Pick 2–4 activities and go!</p>
            </div>
          )}
          {showMap && (
            <p className="text-sm">See <Link className="underline" href="/guides/be-whale-wise">Be Whale Wise</Link> for shore viewing.</p>
          )}
        </section>
      )}

      {tab === "Map" && showMap && (
        <section className="grid gap-3">
          <MapView places={places} selectedPlaceId={selectedPlaceId} onSelect={setSelectedPlaceId} />
          <PlaceList places={places} selectedPlaceId={selectedPlaceId} onSelect={setSelectedPlaceId} />
        </section>
      )}

      {tab === "Activities" && (
        <ActivityList packSlug={slug} activities={activities} timeBudgetMin={timeMin} />
      )}

      {tab === "Bingo" && <BingoGrid packSlug={slug} items={bingo} />}

      {tab === "Journal" && <Journal packSlug={slug} />}

      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur border-t">
        <div className="max-w-3xl mx-auto"><SafetyCard slug={slug} /></div>
      </footer>
    </main>
  );
}