import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center gap-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Tap Target — Mini Game</h1>
      <p className="text-foreground/70 max-w-2xl">
        A simple reflex game. Tap the moving target to score points before the timer runs out.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/game" className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-3 font-medium hover:opacity-90">Play Now</Link>
        <Link href="/leaderboard" className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/20 px-5 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/10">View Leaderboard</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
        <div className="rounded-lg border border-black/10 dark:border-white/20 p-4 text-left">
          <h3 className="font-semibold mb-1">Fast Gameplay</h3>
          <p className="text-sm text-foreground/70">30 seconds, score as much as you can.</p>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/20 p-4 text-left">
          <h3 className="font-semibold mb-1">Responsive</h3>
          <p className="text-sm text-foreground/70">Works great on mobile and desktop.</p>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/20 p-4 text-left">
          <h3 className="font-semibold mb-1">Leaderboard</h3>
          <p className="text-sm text-foreground/70">Track top scores locally.</p>
        </div>
      </div>
    </section>
  );
}
