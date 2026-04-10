"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { INITIAL_STATE } from "@/lib/mock";
import {
  buildId,
  buildSimHash,
  computeOptimisticDelta,
  computeRollbackDelta,
  decideResolution
} from "@/lib/simulation";
import { ResolutionMode, Transaction, WalletState } from "@/lib/types";

const STORAGE_KEY = "trx-capability-demo";

type WalletContextValue = {
  state: WalletState;
  receive: (amount: number, fromAddress: string) => void;
  send: (amount: number, toAddress: string) => { ok: true } | { ok: false; reason: string };
  setMode: (mode: ResolutionMode) => void;
  setPendingDurationSeconds: (seconds: number) => void;
  setManualBalance: (amount: number) => void;
  reset: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

function settlePending(state: WalletState, now: number): WalletState {
  let balance = state.balance;
  const transactions = state.transactions.map((tx) => {
    if (tx.status !== "pending" || !tx.resolveAt || tx.resolveAt > now) {
      return tx;
    }

    const nextStatus = decideResolution(tx.resolutionMode ?? state.settings.resolutionMode);
    if (nextStatus === "failed") {
      balance += computeRollbackDelta(tx.type, tx.amount);
    }

    return { ...tx, status: nextStatus, updatedAt: now };
  });

  return { ...state, balance, transactions };
}

function hydrateState(): WalletState {
  if (typeof window === "undefined") {
    return INITIAL_STATE;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return INITIAL_STATE;
  }

  try {
    return settlePending(JSON.parse(raw) as WalletState, Date.now());
  } catch {
    return INITIAL_STATE;
  }
}

function persistState(state: WalletState): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function WalletProvider({ children }: PropsWithChildren): JSX.Element {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(hydrateState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      persistState(state);
    }
  }, [hydrated, state]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const timer = window.setInterval(() => {
      setState((previous) => settlePending(previous, Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [hydrated]);

  const receive = useCallback((amount: number, fromAddress: string) => {
    setState((previous) => {
      const now = Date.now();
      const resolveAt = now + previous.settings.pendingDurationSeconds * 1000;
      const tx: Transaction = {
        id: buildId("receive"),
        hash: buildSimHash(),
        walletAddress: previous.walletAddress,
        counterpartyAddress: fromAddress,
        type: "receive",
        amount,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        resolveAt,
        resolutionMode: previous.settings.resolutionMode
      };

      return {
        ...previous,
        balance: previous.balance + computeOptimisticDelta("receive", amount),
        transactions: [tx, ...previous.transactions]
      };
    });
  }, []);

  const send = useCallback((amount: number, toAddress: string) => {
    let accepted = true;
    setState((previous) => {
      if (previous.balance < amount) {
        accepted = false;
        return previous;
      }

      const now = Date.now();
      const resolveAt = now + previous.settings.pendingDurationSeconds * 1000;
      const tx: Transaction = {
        id: buildId("send"),
        hash: buildSimHash(),
        walletAddress: previous.walletAddress,
        counterpartyAddress: toAddress,
        type: "send",
        amount,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        resolveAt,
        resolutionMode: previous.settings.resolutionMode
      };

      return {
        ...previous,
        balance: previous.balance - amount,
        transactions: [tx, ...previous.transactions]
      };
    });

    return accepted
      ? { ok: true as const }
      : { ok: false as const, reason: "Insufficient demo balance for this simulated send." };
  }, []);

  const setMode = useCallback((mode: ResolutionMode) => {
    setState((previous) => ({
      ...previous,
      settings: { ...previous.settings, resolutionMode: mode }
    }));
  }, []);

  const setPendingDurationSeconds = useCallback((seconds: number) => {
    setState((previous) => ({
      ...previous,
      settings: { ...previous.settings, pendingDurationSeconds: Math.max(3, Math.min(60, seconds)) }
    }));
  }, []);

  const setManualBalance = useCallback((amount: number) => {
    setState((previous) => ({ ...previous, balance: Math.max(0, Math.round(amount * 100) / 100) }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const value = useMemo(
    () => ({ state, receive, send, setMode, setPendingDurationSeconds, setManualBalance, reset }),
    [receive, reset, send, setManualBalance, setMode, setPendingDurationSeconds, state]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletStore(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletStore must be used inside WalletProvider");
  }
  return context;
}
