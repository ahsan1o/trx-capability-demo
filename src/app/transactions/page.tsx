import { TransactionTable } from "@/components/TransactionTable";

export default function TransactionsPage(): JSX.Element {
  return (
    <div className="grid gap-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-sand">Explorer-Style Transactions</h2>
        <p className="mt-2 text-sm text-mist/80">
          Hashes, statuses, and timestamps below are synthetic for demo use only and cannot be verified on TRON explorer.
        </p>
      </section>
      <TransactionTable />
    </div>
  );
}
