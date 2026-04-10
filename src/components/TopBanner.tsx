export function TopBanner(): JSX.Element {
  return (
    <div className="rounded-2xl border border-sea/30 bg-gradient-to-r from-ink/85 via-ink/75 to-sea/20 px-4 py-3 text-sm text-mist shadow-lg backdrop-blur">
      <p className="font-semibold text-sand">Demo + Compliance Guardrails</p>
      <p>Simulation on dashboard, real proof workflow on testnet, and no mainnet spoofing.</p>
      <p className="mt-1 text-xs text-mist/80">Mainnet disabled | No fake spendable funds | Explorer-verifiable evidence only</p>
    </div>
  );
}
