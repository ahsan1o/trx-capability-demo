import { ReceiveSendPanel } from "@/components/ReceiveSendPanel";
import { TransactionTable } from "@/components/TransactionTable";
import { WalletSummary } from "@/components/WalletSummary";

export default function HomePage(): JSX.Element {
  return (
    <div className="grid gap-6">
      <section className="panel overflow-hidden">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-sand">Client-Ready Prototype Dashboard</h2>
            <p className="mt-2 text-sm text-mist/85">
              Present simulation UX and show legal blockchain capability with a clean, auditable testnet proof path.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge">Fast Demo Flow</span>
              <span className="badge">Policy Safe</span>
              <span className="badge">Explorer Proof</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <article className="card">
              <p className="text-xs uppercase tracking-[0.16em] text-mist/70">Execution Mode</p>
              <p className="mt-1 text-lg font-semibold text-sand">Simulation + Testnet</p>
            </article>
            <article className="card">
              <p className="text-xs uppercase tracking-[0.16em] text-mist/70">Risk</p>
              <p className="mt-1 text-lg font-semibold text-sand">No Mainnet Exposure</p>
            </article>
            <article className="card">
              <p className="text-xs uppercase tracking-[0.16em] text-mist/70">Proof</p>
              <p className="mt-1 text-lg font-semibold text-sand">Public Explorer Links</p>
            </article>
          </div>
        </div>
      </section>
      <WalletSummary />
      <ReceiveSendPanel />
      <TransactionTable limit={6} />
    </div>
  );
}
