export default function OfflinePage() {
  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold mb-2">You are offline</h1>
      <p className="text-muted-foreground max-w-md">
        Limited functionality is available. You can still view previously loaded packs and your saved progress. When you reconnect, the app will update.
      </p>
    </main>
  );
}