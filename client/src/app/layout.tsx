import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/UI/NavBar";
import { Toaster } from "react-hot-toast";
import RootLayoutPage from "@/components/UI/RootLayout";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katha-Corner",
  description: "Your all in one Social Media Platform!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          <RootLayoutPage>{children}</RootLayoutPage>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              success: {
                duration: 4000,
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
