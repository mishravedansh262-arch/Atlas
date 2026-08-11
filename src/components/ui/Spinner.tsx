import { Loader2 } from "lucide-react";

import { cn } from "../../lib/cn";

type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      aria-hidden="true"
      className={cn("animate-spin text-current", className)}
    />
  );
}
