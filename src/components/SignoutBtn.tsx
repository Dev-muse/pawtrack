"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/action";

const SignoutBtn = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        await startTransition(async () => {
          await logout();
        });
      }}
    >
      Sign out
    </Button>
  );
};

export default SignoutBtn;
