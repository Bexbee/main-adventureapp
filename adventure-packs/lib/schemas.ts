import { z } from "zod";

export const PACK_SLUGS = ["fort_worden_shore", "homebase_walkable"] as const;
export type PackSlug = typeof PACK_SLUGS[number];

export const PlaceSchema = z.object({
  pack_slug: z.enum(PACK_SLUGS),
  place_id: z.string(),
  name: z.string(),
  type: z.enum(["viewpoint", "beach", "educational", "homebase", "observation", "sit-spot"]),
  description: z.string(),
  address_or_hint: z.string(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  accessibility_notes: z.string().optional(),
  parking_notes: z.string().optional(),
  restroom_notes: z.string().optional(),
  hazards_notes: z.string().optional(),
  time_min: z.number(),
  route_order: z.number(),
  external_link: z.string().url().optional(),
});
export type Place = z.infer<typeof PlaceSchema>;

export const ActivitySchema = z.object({
  pack_slug: z.enum(PACK_SLUGS),
  activity_id: z.string(),
  title: z.string(),
  category: z.enum(["observe", "listen", "bingo", "ethics", "safety"]),
  instructions: z.string(),
  location_scope: z.string(), // place_id or "ANY"
  duration_min: z.number(),
  required_items: z.string().optional(),
  ethics_safety: z.string().optional(),
  age_range: z.string().optional(),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const BingoItemSchema = z.object({
  pack_slug: z.enum(PACK_SLUGS),
  bingo_id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  safety_note: z.string().optional(),
});
export type BingoItem = z.infer<typeof BingoItemSchema>;

export const PlacesFileSchema = z.array(PlaceSchema);
export const ActivitiesFileSchema = z.array(ActivitySchema);
export const BingoFileSchema = z.array(BingoItemSchema);