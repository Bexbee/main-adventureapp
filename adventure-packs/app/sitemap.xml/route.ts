import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
  const urls = ["/", "/pack/fort_worden_shore", "/pack/homebase_walkable", "/guides/be-whale-wise"].map(
    (p) => `<url><loc>${base}${p}</loc></url>`
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
  return new NextResponse(body, { headers: { "Content-Type": "application/xml" } });
}