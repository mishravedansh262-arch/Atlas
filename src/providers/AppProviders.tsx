import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient();

type AppProvidersProps = {
  children: ReactNode;
};

/**
 * Composition root for app-wide providers.
 * Keeps main.tsx free of provider wiring as the app grows.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>

      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border-secondary)",
            color: "var(--color-text-primary)",
            fontSize: "13px",
          },
        }}
      />
    </QueryClientProvider>
  );
}
