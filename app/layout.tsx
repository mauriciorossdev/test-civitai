import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextQueryProvider from "@/Providers/NextQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clone Civitai App",
  description: "Clone civitai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextQueryProvider>{children}</NextQueryProvider>
      </body>
    </html>
  );
}
