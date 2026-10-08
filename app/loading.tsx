export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse" />
        <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse [animation-delay:0.2s]" />
        <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
