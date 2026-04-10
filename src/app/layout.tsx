import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
import { TopBanner } from "@/components/TopBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "USDT Capability Demo",
  description: "Legal simulation and testnet proof workflow for blockchain client demos."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="aurora" aria-hidden="true" />
          <div className="mesh" aria-hidden="true" />
          <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <TopBanner />
            <header className="panel flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-mist/70">Prototype + Testnet Validation</p>
                <h1 className="text-2xl font-semibold text-sand sm:text-3xl">USDT TRC20 Capability Console</h1>
              </div>
              <nav className="flex flex-wrap gap-2">
                <Link href="/" className="chip">Dashboard</Link>
                <Link href="/capability" className="chip">Real Capability</Link>
                <Link href="/transactions" className="chip">Transactions</Link>
                <Link href="/settings" className="chip">Settings</Link>
              </nav>
            </header>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
