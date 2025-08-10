import { ActivitiesFileSchema, BingoFileSchema, PlacesFileSchema, type Activity, type BingoItem, type Place, type PackSlug } from "./schemas";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return (await res.json()) as T;
}

export async function getPlaces(): Promise<Place[]> {
  const data = await fetchJson<unknown>("/data/places.json");
  const parsed = PlacesFileSchema.safeParse(data);
  if (!parsed.success) {
    console.warn("places.json validation failed", parsed.error);
    return [];
  }
  return parsed.data;
}

export async function getActivities(): Promise<Activity[]> {
  const data = await fetchJson<unknown>("/data/activities.json");
  const parsed = ActivitiesFileSchema.safeParse(data);
  if (!parsed.success) {
    console.warn("activities.json validation failed", parsed.error);
    return [];
  }
  return parsed.data;
}

export async function getBingo(): Promise<BingoItem[]> {
  const data = await fetchJson<unknown>("/data/bingo.json");
  const parsed = BingoFileSchema.safeParse(data);
  if (!parsed.success) {
    console.warn("bingo.json validation failed", parsed.error);
    return [];
  }
  return parsed.data;
}

export function byPack<T extends { pack_slug: PackSlug }>(items: T[], slug: PackSlug): T[] {
  return items.filter((i) => i.pack_slug === slug);
}