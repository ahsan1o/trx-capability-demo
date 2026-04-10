export function TopBanner(): JSX.Element {
  return (
    <div className="rounded-2xl border border-sea/25 bg-ink/75 px-4 py-3 text-sm text-mist shadow-lg backdrop-blur">
      <p className="font-semibold text-sand">Demo / Test Mode</p>
      <p>Visual simulation on dashboard. Legal testnet proof on the capability page.</p>
      <p className="mt-1 text-xs text-mist/80">Mainnet disabled | No fake spendable funds | Explorer proof only</p>
    </div>
  );
}
