import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Think Vault",
  description: "An online LMS made to help you learn and grow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <NuqsAdapter>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </NuqsAdapter>
    </ClerkProvider>
  );
}
