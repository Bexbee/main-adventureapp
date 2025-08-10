"use client";

import type { Place } from "@/lib/schemas";

interface PlaceListProps {
  places: Place[];
  selectedPlaceId?: string | null;
  onSelect: (placeId: string | null) => void;
}

export default function PlaceList({ places, selectedPlaceId, onSelect }: PlaceListProps) {
  return (
    <ul className="divide-y rounded-xl border overflow-hidden">
      {places.map((p) => (
        <li key={p.place_id} className="bg-white">
          <button
            className={`w-full text-left p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
              selectedPlaceId === p.place_id ? "bg-sky-50" : ""
            }`}
            onClick={() => onSelect(p.place_id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{p.name}</h4>
                <p className="text-sm text-gray-600">{p.address_or_hint}</p>
              </div>
              <span className="text-xs text-gray-500">{p.time_min} min</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}