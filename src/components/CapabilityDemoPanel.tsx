"use client";

import { useMemo, useState } from "react";

const NETWORKS = [
  { id: "tron_nile", label: "TRON Nile Testnet", explorerBase: "https://nile.tronscan.org/#/transaction/" },
  { id: "tron_shasta", label: "TRON Shasta Testnet", explorerBase: "https://shasta.tronscan.org/#/transaction/" },
  { id: "sepolia", label: "Ethereum Sepolia", explorerBase: "https://sepolia.etherscan.io/tx/" }
] as const;

type SupportedNetwork = (typeof NETWORKS)[number]["id"];

const CHECKLIST = [
  "Connected a testnet wallet",
  "Funded gas token from faucet",
  "Sent one verifiable test transaction",
  "Captured tx hash and explorer link",
  "Monitored visibility for requested timeline"
];

function isTronStyleAddress(address: string): boolean {
  return /^T[a-zA-Z0-9]{20,50}$/.test(address.trim());
}

function isTxHashLike(value: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(value.trim()) || /^[a-fA-F0-9]{64}$/.test(value.trim());
}

function explorerLink(network: SupportedNetwork, txHash: string): string {
  const found = NETWORKS.find((item) => item.id === network);
  return found ? `${found.explorerBase}${txHash.startsWith("0x") ? txHash : `0x${txHash}`}` : "";
}

export function CapabilityDemoPanel(): JSX.Element {
  const [network, setNetwork] = useState<SupportedNetwork>("tron_nile");
  const [walletAddress, setWalletAddress] = useState("TExampleClient4Rm7wG8m9cQ2sW5kP3dN0a");
  const [txHash, setTxHash] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const addressValid = useMemo(() => {
    if (network === "sepolia") {
      return /^0x[a-fA-F0-9]{40}$/.test(walletAddress.trim());
    }
    return isTronStyleAddress(walletAddress);
  }, [network, walletAddress]);

  const txValid = useMemo(() => isTxHashLike(txHash), [txHash]);
  const proofLink = useMemo(() => (txValid ? explorerLink(network, txHash) : ""), [network, txHash, txValid]);

  const clientMessage = useMemo(
    () =>
      [
        "We can demonstrate genuine blockchain execution using testnet assets.",
        `Network: ${NETWORKS.find((item) => item.id === network)?.label ?? "Selected Testnet"}`,
        "We will send one sample transaction to your provided testnet wallet and share explorer proof.",
        "If approved, we can scale with compliant transfer throughput and clear reporting."
      ].join("\n"),
    [network]
  );

  return (
    <section className="panel">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-mist/70">Legal Capability Mode</p>
          <h2 className="text-2xl font-semibold text-sand">Real Testnet Proof Workflow</h2>
        </div>
        <span className="badge">No Fake Mainnet Funds</span>
      </div>

      <p className="mt-3 text-sm text-mist/85">
        This flow demonstrates real blockchain competence with testnet transactions that are publicly verifiable.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card">
          <label className="field-label" htmlFor="network">Network</label>
          <select id="network" className="input" value={network} onChange={(event) => setNetwork(event.target.value as SupportedNetwork)}>
            {NETWORKS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>

          <label className="field-label" htmlFor="wallet">Client Wallet</label>
          <input id="wallet" className="input" value={walletAddress} onChange={(event) => setWalletAddress(event.target.value)} placeholder={network === "sepolia" ? "0x..." : "T..."} />
          <p className={addressValid ? "mt-2 text-xs text-emerald-200" : "mt-2 text-xs text-red-200"}>
            {addressValid ? "Wallet format looks valid for this network." : "Wallet format does not match selected network."}
          </p>

          <label className="field-label" htmlFor="txhash">Transaction Hash (Proof)</label>
          <input id="txhash" className="input" value={txHash} onChange={(event) => setTxHash(event.target.value)} placeholder="0x..." />
          <p className={txValid ? "mt-2 text-xs text-emerald-200" : "mt-2 text-xs text-red-200"}>
            {txValid ? "Tx hash format looks valid." : "Tx hash must be 64 hex characters (with or without 0x)."}
          </p>

          {proofLink ? (
            <a className="button-secondary mt-4 inline-flex" href={proofLink} target="_blank" rel="noreferrer">
              Open Explorer Proof
            </a>
          ) : null}
        </div>

        <div className="card">
          <h3 className="font-semibold text-sand">Execution Checklist</h3>
          <div className="mt-3 grid gap-2">
            {CHECKLIST.map((item) => {
              const active = checked.includes(item);
              return (
                <label key={item} className="flex items-center gap-2 text-sm text-mist/90">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      setChecked((previous) =>
                        previous.includes(item) ? previous.filter((value) => value !== item) : [...previous, item]
                      )
                    }
                  />
                  {item}
                </label>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-white/15 bg-ink/40 p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-mist/70">Client Message Template</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-mist/90">{clientMessage}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
