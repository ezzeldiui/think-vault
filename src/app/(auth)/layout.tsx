import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Think Vault - Authentication",
  description: "An online LMS made to help you learn and grow",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "flex items-center justify-center bg-slate-100",
            inter.className,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
