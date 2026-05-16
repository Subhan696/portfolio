export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-ivory/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-wine-600 border-r-wine-300 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-wine-300 via-wine-600 to-wine-700 opacity-30 blur-md" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-ivory/60">
          Loading
        </p>
      </div>
    </div>
  );
}
