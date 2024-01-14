import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextUIProvider from "./NextUIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Second-Life",
  description: "Offer items you no longer need to the needy ones!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="dark text-foreground bg-background">
          <NextUIProvider>{children}</NextUIProvider>
        </main>
      </body>
    </html>
  );
}
