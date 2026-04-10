"use client";

import { useState } from "react";
import { useWalletStore } from "@/lib/store";

export function SimulationSettings(): JSX.Element {
  const {
    state: { settings },
    reset,
    setMode,
    setPendingDurationSeconds
  } = useWalletStore();
  const [seconds, setSeconds] = useState(String(settings.pendingDurationSeconds));

  return (
    <section className="panel">
      <h2 className="text-xl font-semibold text-sand">Simulation Controls</h2>
      <p className="mt-1 text-sm text-mist/80">Select how pending transactions settle in this demo environment.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <button className={settings.resolutionMode === "pending_fail" ? "card border-red-400/40" : "card"} onClick={() => setMode("pending_fail")}>
          <h3 className="font-semibold text-sand">Pending then Failed</h3>
          <p className="mt-1 text-sm text-mist/80">Temporary balance effect is rolled back when timer expires.</p>
        </button>
        <button className={settings.resolutionMode === "pending_confirm" ? "card border-emerald-400/40" : "card"} onClick={() => setMode("pending_confirm")}>
          <h3 className="font-semibold text-sand">Pending then Confirmed</h3>
          <p className="mt-1 text-sm text-mist/80">Pending action finalizes and remains in balance.</p>
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[220px_auto] sm:items-end">
        <div>
          <label className="field-label" htmlFor="seconds">Pending Duration (3-60 sec)</label>
          <input id="seconds" className="input" value={seconds} onChange={(event) => setSeconds(event.target.value)} />
        </div>
        <button
          className="button-secondary"
          onClick={() => {
            const next = Number(seconds);
            if (!Number.isNaN(next)) {
              setPendingDurationSeconds(next);
            }
          }}
        >
          Save Duration
        </button>
      </div>

      <button className="button-danger mt-8" onClick={reset}>
        Reset Demo Data
      </button>
    </section>
  );
}
