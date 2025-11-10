import H1 from "@/components/Heading";
import { Button } from "@/components/ui/button";
import React from "react";

const PaymentPage = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-y-4 "> 
      <H1>PawTrack access requires payment</H1>
      <Button className="rounded-full px-2 p-6 text-base hover:text-white bg-orange-400 text-zinc-900 ">Buy lifetime access for $299</Button>
    </main>
  );
};

export default PaymentPage;
