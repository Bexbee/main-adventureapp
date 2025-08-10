import Link from "next/link";
import { Info } from "lucide-react";

export default function SafetyCard({ slug }: { slug: string }) {
  const whaleWise = slug === "fort_worden_shore";
  return (
    <div className="rounded-2xl border bg-white p-3 flex items-start gap-3">
      <Info className="text-amber-600" />
      <div>
        <h4 className="font-medium">Ethics & Safety</h4>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          <li>Stay on paths and respect closures</li>
          <li>Keep a safe distance from wildlife</li>
          <li>Pack in, pack out</li>
        </ul>
        {whaleWise && (
          <p className="text-sm mt-2">
            See <Link className="underline" href="/guides/be-whale-wise">Be Whale Wise</Link> for shore viewing.
          </p>
        )}
      </div>
    </div>
  );
}