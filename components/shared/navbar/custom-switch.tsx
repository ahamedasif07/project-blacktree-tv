"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function CustomSwitch({
  className,
  size = "default",
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  const toggleTheme = (checked: boolean) => {
    // Check if the browser supports View Transitions
    if (!document.startViewTransition) {
      onCheckedChange?.(checked);
      return;
    }

    document.startViewTransition(() => {
      onCheckedChange?.(checked);
    });
  };

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors duration-500 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[size=default]:h-7 data-[size=default]:w-12 data-[size=sm]:h-5 data-[size=sm]:w-9 data-checked:bg-primary data-unchecked:bg-input disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none relative flex items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform duration-500 ease-in-out",
          "group-data-[size=default]/switch:size-6 group-data-[size=sm]/switch:size-4",
          "group-data-[size=default]/switch:data-checked:translate-x-[20px] group-data-[size=sm]/switch:data-checked:translate-x-[16px]",
          "group-data-[size=default]/switch:data-unchecked:translate-x-0.5 group-data-[size=sm]/switch:data-unchecked:translate-x-0.5",
        )}
      >
        <Sun className="absolute h-3.5 w-3.5 text-yellow-500 transition-all duration-500 rotate-0 scale-100 opacity-100 group-data-[state=checked]/switch:-rotate-90 group-data-[state=checked]/switch:scale-0 group-data-[state=checked]/switch:opacity-0" />
        <Moon className="absolute h-3.5 w-3.5 text-slate-900 dark:text-slate-200 transition-all duration-500 rotate-90 scale-0 opacity-0 group-data-[state=checked]/switch:rotate-0 group-data-[state=checked]/switch:scale-100 group-data-[state=checked]/switch:opacity-100" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { CustomSwitch };
