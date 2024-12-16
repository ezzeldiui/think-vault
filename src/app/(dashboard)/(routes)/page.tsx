"use client";
import { UserButton } from "@clerk/nextjs";
import { Construction } from "lucide-react";

export default function Home() {
  const isHaveStripeAccount = false;

  if (!isHaveStripeAccount) {
    return (
      <>
        <div className="flex size-full flex-col items-center justify-center bg-zinc-200">
          <Construction size={200} className="text-muted-foreground" />
          <h1 className="text-4xl font-semibold text-muted-foreground">
            Under Construction
          </h1>
          <p className="text-xs font-bold text-muted-foreground">
            (never going to get built until i can get a stripe account)
          </p>
        </div>
      </>
    );
  }
}
