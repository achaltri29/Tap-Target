import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tap Target — Mini Game",
  description: "Weekly Challenge: Next.js + Tailwind three-page game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b border-black/[.08] dark:border-white/[.145]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">Mini Game</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/game" className="hover:underline">Play</Link>
              <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-8 min-h-[calc(100vh-65px)]">
          {children}
        </main>
        <footer className="border-t border-black/[.08] dark:border-white/[.145]">
          <div className="max-w-5xl mx-auto px-6 py-6 text-xs text-foreground/70 text-center">
            Built with Next.js + Tailwind By Achal Tripathi
          </div>
        </footer>
      </body>
    </html>
  );
}
