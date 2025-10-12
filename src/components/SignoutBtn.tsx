"use client";

import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/action";

const SignoutBtn = () => {
  return <Button onClick={async () => logout()}>Sign out</Button>;
};

export default SignoutBtn;
