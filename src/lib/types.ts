export type TransactionType = "receive" | "send";

export type TransactionStatus = "pending" | "confirmed" | "failed";

export type ResolutionMode = "pending_confirm" | "pending_fail";

export interface Transaction {
  id: string;
  hash: string;
  walletAddress: string;
  counterpartyAddress: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  createdAt: number;
  updatedAt: number;
  resolveAt?: number;
  resolutionMode?: ResolutionMode;
}

export interface WalletSettings {
  resolutionMode: ResolutionMode;
  pendingDurationSeconds: number;
}

export interface WalletState {
  walletAddress: string;
  balance: number;
  transactions: Transaction[];
  settings: WalletSettings;
}

export type TxFilter = "all" | TransactionStatus;
