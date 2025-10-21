"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();
  const gameDurationSeconds = 30;
  const boardSize = 320; // px
  const targetSize = 36; // px
  const moveEveryMs = 700;

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDurationSeconds);
  const [running, setRunning] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const moverRef = useRef<NodeJS.Timeout | null>(null);

  const randomPos = useCallback(() => {
    const max = boardSize - targetSize;
    return {
      x: Math.floor(Math.random() * (max + 1)),
      y: Math.floor(Math.random() * (max + 1)),
    };
  }, []);

  useEffect(() => {
    setPos(randomPos());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    moverRef.current = setInterval(() => {
      setPos(randomPos());
    }, moveEveryMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moverRef.current) clearInterval(moverRef.current);
    };
  }, [randomPos]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (moverRef.current) clearInterval(moverRef.current);
      const search = new URLSearchParams({ score: String(score) });
      router.push(`/game-over?${search.toString()}`);
    }
  }, [timeLeft, running, score, router]);

  const handleHit = useCallback(() => {
    setScore((s) => s + 1);
    setPos(randomPos());
  }, [randomPos]);

  const accuracyHint = useMemo(() => {
    if (score < 10) return "Warm up";
    if (score < 20) return "Nice";
    if (score < 30) return "Great";
    return "Insane";
  }, [score]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/70">Time Left</div>
        <div className="text-2xl font-semibold tabular-nums">{timeLeft}s</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/70">Score</div>
        <div className="text-2xl font-semibold tabular-nums">{score}</div>
      </div>
      <div className="text-xs text-foreground/60">{accuracyHint}</div>

      <div
        className="relative rounded-lg border border-black/10 dark:border-white/20 bg-black/[.02] dark:bg-white/[.03] overflow-hidden select-none touch-none"
        style={{ width: boardSize, height: boardSize }}
      >
        <button
          aria-label="target"
          onClick={handleHit}
          className="absolute rounded-full bg-black dark:bg-white text-white dark:text-black shadow hover:opacity-90 focus:outline-none"
          style={{
            width: targetSize,
            height: targetSize,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/")}
          className="rounded-md border border-black/10 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
          Quit
        </button>
        <button
          onClick={() => {
            setScore(0);
            setTimeLeft(gameDurationSeconds);
            setRunning(true);
            if (timerRef.current) clearInterval(timerRef.current);
            if (moverRef.current) clearInterval(moverRef.current);
            setPos(randomPos());
            timerRef.current = setInterval(() => {
              setTimeLeft((t) => (t > 0 ? t - 1 : 0));
            }, 1000);
            moverRef.current = setInterval(() => {
              setPos(randomPos());
            }, moveEveryMs);
          }}
          className="rounded-md bg-black text-white dark:bg.white dark:text-black px-4 py-2 text-sm hover:opacity-90"
        >
          Restart
        </button>
      </div>
    </section>
  );
}

