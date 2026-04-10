import { ReceiveSendPanel } from "@/components/ReceiveSendPanel";
import { TransactionTable } from "@/components/TransactionTable";
import { WalletSummary } from "@/components/WalletSummary";

export default function HomePage(): JSX.Element {
  return (
    <div className="grid gap-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-sand">Presentation Modes</h2>
        <p className="mt-2 text-sm text-mist/85">
          Use Dashboard for simulation UX. Use Real Capability for legal testnet proof with explorer-verifiable hashes.
        </p>
      </section>
      <WalletSummary />
      <ReceiveSendPanel />
      <TransactionTable limit={6} />
    </div>
  );
}
