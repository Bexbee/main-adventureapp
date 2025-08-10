import Link from "next/link";
import { Map, Navigation } from "lucide-react";

interface PackCardProps {
  slug: "fort_worden_shore" | "homebase_walkable";
  title: string;
  description: string;
}

export default function PackCard({ slug, title, description }: PackCardProps) {
  return (
    <Link
      href={`/pack/${slug}`}
      className="block rounded-2xl border p-4 bg-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <div className="flex items-center gap-3">
        {slug === "fort_worden_shore" ? (
          <Map className="text-sky-600" />
        ) : (
          <Navigation className="text-emerald-600" />
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </Link>
  );
}