"use client";

import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useRouter } from "next/navigation";
import { persistor, store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <PersistGate loading={null} persistor={persistor}>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider attribute="class" defaultTheme="light">
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}
