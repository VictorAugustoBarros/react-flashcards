/** @format */

"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  rounded?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, rounded, ...props }, ref) => {
  // Define a classe base para o progresso
  const baseClasses = "relative h-4 w-full overflow-hidden bg-secondary";
  // Adiciona a classe de borda arredondada apenas para os cantos inferiores se `rounded` for verdadeiro
  const roundedClasses = rounded ? "rounded-bl-lg" : "rounded-full";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(baseClasses, roundedClasses, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
