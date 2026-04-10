"use client";

import { useMemo, useState } from "react";
import { formatAmount, shortAddress } from "@/lib/format";
import { useWalletStore } from "@/lib/store";

export function WalletSummary(): JSX.Element {
  const {
    state: { balance, walletAddress },
    setManualBalance
  } = useWalletStore();
  const [draft, setDraft] = useState(balance.toFixed(2));

  const helper = useMemo(() => `Demo Wallet: ${shortAddress(walletAddress)}`, [walletAddress]);

  return (
    <section className="panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-sand">USDT Wallet (Simulated)</h2>
          <p className="text-sm text-mist/80">{helper}</p>
        </div>
        <span className="badge">TRC20 Demo</span>
      </div>

      <div className="mt-6">
        <p className="text-sm uppercase tracking-wider text-mist/70">Current Balance</p>
        <p className="mt-2 text-4xl font-semibold text-sand">{formatAmount(balance)} USDT</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input className="input" value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Edit demo balance" />
        <button
          className="button-secondary"
          onClick={() => {
            const next = Number(draft);
            if (!Number.isNaN(next)) {
              setManualBalance(next);
              setDraft(next.toFixed(2));
            }
          }}
        >
          Update Mock Balance
        </button>
      </div>
    </section>
  );
}
