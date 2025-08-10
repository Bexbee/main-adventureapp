export default function BeWhaleWise() {
  return (
    <main className="p-6 max-w-prose mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Be Whale Wise</h1>
      <p className="text-gray-700 mb-4">Shore viewing guidelines to keep whales and people safe.</p>
      <ul className="list-disc ml-5 space-y-2 text-gray-800">
        <li>View from shore; never approach or enter the water near whales.</li>
        <li>Use binoculars; do not pursue, feed, or touch wildlife.</li>
        <li>Keep dogs leashed away from marine mammals.</li>
        <li>Respect closures and signage; give seals and pups extra space.</li>
      </ul>
      <p className="mt-4 text-sm text-gray-600">
        Learn more at <a className="underline" href="https://www.bewhalewise.org" target="_blank" rel="noopener noreferrer">bewhalewise.org</a>
      </p>
    </main>
  );
}