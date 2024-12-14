"use client"

import PaypalButton from "@/components/paypal-button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const handleSuccess = (details: any) => {
    console.log(details);
  };
  return (
    <>
      <UserButton />
      <PaypalButton
        amount={"99.99"}
        onSuccess={handleSuccess}
      />
    </>
  );
}
