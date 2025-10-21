"use client";

import { useEffect, useState } from "react";

type LeaderboardEntry = { name: string; score: number; when: string };

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("leaderboard:v1");
      const list = raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
      list.sort((a, b) => b.score - a.score || a.when.localeCompare(b.when));
      setEntries(list.slice(0, 25));
    } catch {
      setEntries([]);
    }
  }, []);

  const clear = () => {
    localStorage.removeItem("leaderboard:v1");
    setEntries([]);
  };

  return (
    <section className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <button
          onClick={clear}
          className="rounded-md border border-black/10 dark:border-white/20 px-3 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/10"
        >
          Clear
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-foreground/70">No scores yet. Play a game!</p>
      ) : (
        <ol className="space-y-2">
          {entries.map((e, i) => (
            <li
              key={`${e.name}-${e.when}`}
              className="flex items-center justify-between rounded-md border border-black/10 dark:border-white/20 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-right tabular-nums text-foreground/60">{i + 1}.</span>
                <span className="font-medium">{e.name}</span>
              </div>
              <div className="tabular-nums font-semibold">{e.score}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}


