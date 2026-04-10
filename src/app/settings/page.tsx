import { SimulationSettings } from "@/components/SimulationSettings";

export default function SettingsPage(): JSX.Element {
  return (
    <div className="grid gap-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-sand">Safety and Simulation Policy</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist/85">
          <li>Simulation pages do not connect to TRON mainnet or testnet.</li>
          <li>Real capability demonstrations must use testnet only.</li>
          <li>No real USDT is created, moved, or spent.</li>
          <li>Pending behavior is purely visual to simulate client workflows.</li>
          <li>Deceptive or fake wallet-balance claims are out of scope.</li>
        </ul>
      </section>
      <SimulationSettings />
    </div>
  );
}
