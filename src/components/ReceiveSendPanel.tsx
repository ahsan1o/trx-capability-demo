"use client";

import { FormEvent, useState } from "react";
import { isAddressLike, normalizeAmount } from "@/lib/simulation";
import { useWalletStore } from "@/lib/store";

export function ReceiveSendPanel(): JSX.Element {
  const { receive, send } = useWalletStore();
  const [message, setMessage] = useState<string | null>(null);
  const [receiveAmount, setReceiveAmount] = useState("100");
  const [receiveAddress, setReceiveAddress] = useState("TClientX5fAz7P2m9wQ8v4Vq8kZ1sMr0B7");
  const [sendAmount, setSendAmount] = useState("50");
  const [sendAddress, setSendAddress] = useState("TMerchant4kL2d2zY8tV5pQ4mN6sHc9nA1");

  function onReceive(event: FormEvent) {
    event.preventDefault();
    const amount = normalizeAmount(receiveAmount);
    if (!amount) {
      setMessage("Receive amount must be greater than 0.");
      return;
    }
    if (!isAddressLike(receiveAddress)) {
      setMessage("From address must look like a TRON address in demo format.");
      return;
    }
    receive(amount, receiveAddress.trim());
    setMessage("Incoming demo transaction added as pending.");
  }

  function onSend(event: FormEvent) {
    event.preventDefault();
    const amount = normalizeAmount(sendAmount);
    if (!amount) {
      setMessage("Send amount must be greater than 0.");
      return;
    }
    if (!isAddressLike(sendAddress)) {
      setMessage("Recipient address must look like a TRON address in demo format.");
      return;
    }
    const result = send(amount, sendAddress.trim());
    setMessage(result.ok ? "Outgoing demo transaction added as pending." : result.reason);
  }

  return (
    <section className="panel">
      <h2 className="text-xl font-semibold text-sand">Simulate Activity</h2>
      <p className="mt-1 text-sm text-mist/80">All actions are visual simulation only and do not reach TRON blockchain.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <form onSubmit={onReceive} className="card">
          <h3 className="font-semibold text-sand">Receive USDT</h3>
          <label className="field-label" htmlFor="receive-amount">Amount (USDT)</label>
          <input id="receive-amount" className="input" value={receiveAmount} onChange={(event) => setReceiveAmount(event.target.value)} />
          <label className="field-label" htmlFor="receive-address">From Address (Demo)</label>
          <input id="receive-address" className="input" value={receiveAddress} onChange={(event) => setReceiveAddress(event.target.value)} />
          <button type="submit" className="button-primary mt-4">Receive (Simulated)</button>
        </form>

        <form onSubmit={onSend} className="card">
          <h3 className="font-semibold text-sand">Send USDT</h3>
          <label className="field-label" htmlFor="send-amount">Amount (USDT)</label>
          <input id="send-amount" className="input" value={sendAmount} onChange={(event) => setSendAmount(event.target.value)} />
          <label className="field-label" htmlFor="send-address">Recipient Address (Demo)</label>
          <input id="send-address" className="input" value={sendAddress} onChange={(event) => setSendAddress(event.target.value)} />
          <button type="submit" className="button-primary mt-4">Send (Simulated)</button>
        </form>
      </div>

      {message ? <p className="mt-4 rounded-lg border border-sea/20 bg-sea/10 p-3 text-sm text-mist">{message}</p> : null}
    </section>
  );
}
