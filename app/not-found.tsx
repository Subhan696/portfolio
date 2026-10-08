import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">404</p>
      <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight md:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-2 text-sm font-medium hover:border-black dark:hover:border-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
