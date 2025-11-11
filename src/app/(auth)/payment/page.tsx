"use client";

import { createCheckoutSession } from "@/actions/action";
import H1 from "@/components/Heading";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";

const PaymentPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isPending, startTransition] = useTransition();
  console.log("search Params", searchParams);
  return (
    <main className="flex flex-col justify-center items-center gap-y-4 ">
      <H1>PawTrack access requires payment</H1>
      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
          className="rounded-full px-2 p-6 text-base hover:text-white bg-orange-400 text-zinc-900 "
        >
          {isPending ? "Loading..." : "Buy lifetime access for $299"}
        </Button>
      )}

      {searchParams.success && (
        <p className="text-sm text-green-700 mt-2">
          Success!, You now have lifetime access
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-sm text-red-700 mt-2">
          Payment cancelled , try again
        </p>
      )}
    </main>
  );
};

export default PaymentPage;
