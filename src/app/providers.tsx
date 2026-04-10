"use client";

import { PropsWithChildren } from "react";
import { WalletProvider } from "@/lib/store";

export function Providers({ children }: PropsWithChildren): JSX.Element {
  return <WalletProvider>{children}</WalletProvider>;
}
