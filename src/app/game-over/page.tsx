"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type LeaderboardEntry = { name: string; score: number; when: string };

function readLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("leaderboard:v1");
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem("leaderboard:v1", JSON.stringify(entries));
  } catch {}
}

export default function GameOverPage() {
  const router = useRouter();
  const params = useSearchParams();
  const score = useMemo(() => Number(params.get("score") ?? "0"), [params]);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(score) || score < 0) {
      router.replace("/");
    }
  }, [score, router]);

  const save = () => {
    const trimmed = name.trim().slice(0, 24);
    if (!trimmed) return;
    const now = new Date().toISOString();
    const entries = readLeaderboard();
    entries.push({ name: trimmed, score, when: now });
    entries.sort((a, b) => b.score - a.score || a.when.localeCompare(b.when));
    writeLeaderboard(entries.slice(0, 25));
    setSaved(true);
  };

  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Game Over</h1>
      <p className="text-foreground/70 mb-6">Your score: <span className="font-semibold">{score}</span></p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => router.push("/game")}
          className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm hover:opacity-90"
        >
          Play Again
        </button>
        <button
          onClick={() => router.push("/leaderboard")}
          className="rounded-md border border-black/10 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
          View Leaderboard
        </button>
      </div>

      <div className="rounded-lg border border-black/10 dark:border-white/20 p-4">
        <h2 className="font-semibold mb-2">Save your score</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />
          <button
            onClick={save}
            disabled={saved || !name.trim()}
            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm hover:opacity-90 disabled:opacity-50"
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <p className="text-xs text-foreground/60 mt-2">Scores are stored locally in your browser.</p>
      </div>
    </section>
  );
}


