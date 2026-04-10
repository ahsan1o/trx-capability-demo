"use client";

import { useMemo, useState } from "react";
import { formatAmount, formatDate, shortAddress } from "@/lib/format";
import { useWalletStore } from "@/lib/store";
import { TxFilter } from "@/lib/types";

const FILTERS: TxFilter[] = ["all", "pending", "confirmed", "failed"];

export function TransactionTable({ limit }: { limit?: number }): JSX.Element {
  const {
    state: { transactions }
  } = useWalletStore();
  const [filter, setFilter] = useState<TxFilter>("all");

  const rows = useMemo(() => {
    const filtered = transactions.filter((tx) => filter === "all" || tx.status === filter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [filter, limit, transactions]);

  return (
    <section className="panel">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-sand">Transaction History</h2>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button key={item} className={item === filter ? "chip-active" : "chip"} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-mist/70">
            <tr>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Counterparty</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Hash</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tx) => (
              <tr key={tx.id} className="border-t border-white/10 text-mist">
                <td className="py-3 pr-4 capitalize">{tx.type}</td>
                <td className="py-3 pr-4">{formatAmount(tx.amount)} USDT</td>
                <td className="py-3 pr-4">{shortAddress(tx.counterpartyAddress)}</td>
                <td className="py-3 pr-4"><span className={`status-${tx.status}`}>{tx.status}</span></td>
                <td className="py-3 pr-4 font-mono text-xs">{tx.hash.slice(0, 20)}...</td>
                <td className="py-3">{formatDate(tx.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 ? <p className="mt-4 text-sm text-mist/80">No transactions for this filter.</p> : null}
    </section>
  );
}
