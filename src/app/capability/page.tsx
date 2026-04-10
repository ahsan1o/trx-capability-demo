import { CapabilityDemoPanel } from "@/components/CapabilityDemoPanel";

export default function CapabilityPage(): JSX.Element {
  return (
    <div className="grid gap-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-sand">Real Capability Demonstration</h2>
        <p className="mt-2 text-sm text-mist/85">
          Use this page to present real blockchain competence in a legal way: testnet execution, public tx proof,
          and transparent constraints.
        </p>
      </section>
      <CapabilityDemoPanel />
    </div>
  );
}
