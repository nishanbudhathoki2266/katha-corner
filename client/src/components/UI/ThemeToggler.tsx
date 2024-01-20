// app/components/ThemeSwitcher.tsx
"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-6 w-16 rounded-xl" />;

  return (
    <Switch
      defaultSelected
      size="sm"
      color="success"
      onChange={(e) => {
        setTheme(e.target.checked ? "dark" : "light");
      }}
      thumbIcon={({ isSelected }) => (isSelected ? <FaMoon /> : <FaSun />)}
    >
      <Skeleton isLoaded={mounted}>
        <span className="uppercase font-semibold text-xs">{theme}</span>
      </Skeleton>
    </Switch>
  );
}
