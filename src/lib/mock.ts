import { WalletState } from "@/lib/types";

export const DEMO_NOTICE = "Demo/Test Mode: visual simulation only. No real USDT or on-chain transfer occurs.";
export const INITIAL_STATE: WalletState = {
  walletAddress: "TDEMO5bLSx7Vj4Xo4yY9A7mQ5ktJ8cF3wM",
  balance: 1250.45,
  transactions: [],
  settings: {
    resolutionMode: "pending_fail",
    pendingDurationSeconds: 12
  }
};
