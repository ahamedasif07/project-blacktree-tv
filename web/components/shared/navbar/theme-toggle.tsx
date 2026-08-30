"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useThemeStore } from "@/store/public/use-theme-store";
import { CustomSwitch } from "./custom-switch";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme, setTheme: setStoreTheme } = useThemeStore();

  // Handle Hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    return () => {
      setMounted(false)
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setStoreTheme(newTheme); 
    setTheme(newTheme); 
  };

  if (!mounted) return <div className="h-7 w-12" />; 

  return (
    <div className="flex items-center space-x-2  p-2 rounded-lg">
      <CustomSwitch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
