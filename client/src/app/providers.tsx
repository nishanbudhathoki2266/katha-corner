"use client";

import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
