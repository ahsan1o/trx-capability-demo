import { ResolutionMode, Transaction } from "@/lib/types";

export function buildId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function buildSimHash(): string {
  const left = Math.random().toString(16).slice(2);
  const right = Math.random().toString(16).slice(2);
  return `0xsim${left}${right}`.slice(0, 66);
}

export function normalizeAmount(raw: string): number | null {
  const parsed = Number(raw);
  if (Number.isNaN(parsed) || parsed <= 0) return null;
  return Math.round(parsed * 100) / 100;
}

export function isAddressLike(raw: string): boolean {
  return /^T[a-zA-Z0-9]{20,50}$/.test(raw.trim());
}

export function computeOptimisticDelta(type: Transaction["type"], amount: number): number {
  return type === "receive" ? amount : -amount;
}

export function computeRollbackDelta(type: Transaction["type"], amount: number): number {
  return type === "receive" ? -amount : amount;
}

export function decideResolution(mode: ResolutionMode): Transaction["status"] {
  return mode === "pending_confirm" ? "confirmed" : "failed";
}
