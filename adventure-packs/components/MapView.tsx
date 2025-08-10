"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MlMap, Marker, Popup, AttributionControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Place } from "@/lib/schemas";

interface MapViewProps {
  places: Place[];
  selectedPlaceId?: string | null;
  onSelect?: (placeId: string | null) => void;
}

export default function MapView({ places, selectedPlaceId, onSelect }: MapViewProps) {
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Record<string, { marker: Marker; popup: Popup }>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [-122.763, 48.135],
      zoom: 12.4,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new AttributionControl({ compact: true }));

    places
      .filter((p) => typeof p.lon === "number" && typeof p.lat === "number")
      .forEach((p) => {
        const popup = new maplibregl.Popup({ closeButton: true }).setHTML(
          `<div>
             <h3 style="font-weight:600;margin-bottom:4px;">${p.name}</h3>
             <p style="margin:0 0 6px 0;">${p.description}</p>
             ${p.hazards_notes ? `<p style="margin:0 0 6px 0;color:#b91c1c;">Hazards: ${p.hazards_notes}</p>` : ""}
             <p style="margin:0 0 6px 0;">Suggested time: ${p.time_min} min</p>
             ${p.external_link ? `<a href="${p.external_link}" target="_blank" rel="noopener noreferrer">More info</a>` : ""}
           </div>`
        );
        const marker = new maplibregl.Marker({ color: "#0ea5e9" })
          .setLngLat([p.lon as number, p.lat as number])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener("click", () => onSelect?.(p.place_id));

        markersRef.current[p.place_id] = { marker, popup };
      });

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [places, onSelect]);

  useEffect(() => {
    if (!selectedPlaceId) return;
    const entry = markersRef.current[selectedPlaceId];
    if (entry) {
      entry.popup.addTo(mapRef.current!);
    }
  }, [selectedPlaceId]);

  return <div ref={containerRef} className="w-full h-[360px] rounded-xl overflow-hidden" />;
}