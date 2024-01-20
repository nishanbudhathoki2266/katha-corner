// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
      {theme}
    </Switch>
  );
}
