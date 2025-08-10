import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Pack",
    template: "%s • Adventure Packs",
  },
};

export default function PackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="p-3 border-b bg-white sticky top-0 z-10"><Link href="/" className="underline">Home</Link></nav>
      {children}
    </div>
  );
}