import PackCard from "@/components/PackCard";

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Adventure Packs</h1>
      <p className="text-gray-700 mb-2">Mobile-first PWA. Works offline. No accounts.</p>
      <p className="text-sm text-gray-600 mb-6">Paste your JSON into <code className="bg-gray-100 px-1 rounded">/public/data/*.json</code> or run a CSV converter in <code className="bg-gray-100 px-1 rounded">/scripts/csv-to-json.ts</code>.</p>
      <div className="grid gap-4">
        <PackCard
          slug="fort_worden_shore"
          title="Fort Worden Shore Pack"
          description="Explore the shoreline with parent/teacher guidance. Includes map and safety info."
        />
        <PackCard
          slug="homebase_walkable"
          title="Homebase Walkable"
          description="No-car neighborhood adventures. Simple activities and bingo."
        />
      </div>
      <div className="mt-8 text-sm text-gray-700">
        <h2 className="font-semibold mb-2">Data files</h2>
        <ul className="list-disc ml-5">
          <li><code className="bg-gray-100 px-1 rounded">/public/data/places.json</code></li>
          <li><code className="bg-gray-100 px-1 rounded">/public/data/activities.json</code></li>
          <li><code className="bg-gray-100 px-1 rounded">/public/data/bingo.json</code></li>
        </ul>
        <p className="mt-2">Types and Zod validation in <code className="bg-gray-100 px-1 rounded">/lib/schemas.ts</code>.</p>
      </div>
    </main>
  );
}
