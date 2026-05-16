import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine-600/15 blur-3xl" />
      <div className="relative z-10 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-wine-600">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold gradient-text">
          Lost in the void
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ivory/60">
          This page either doesn't exist yet, or it took the wrong neural pathway.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="accent">
            <Link href="/">Take me home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#projects">View Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
