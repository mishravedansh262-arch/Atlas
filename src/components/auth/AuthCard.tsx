import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border-secondary bg-surface-secondary p-6 shadow-lg sm:p-8">
      {children}
    </div>
  );
}
