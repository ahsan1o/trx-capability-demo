export function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(timestamp));
}

export function shortAddress(value: string): string {
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}
