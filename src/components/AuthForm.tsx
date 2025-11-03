import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login, signUp } from "@/actions/action";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

type AuthFormTypes = {
  type: "login" | "Signup";
};
const AuthForm = ({ type }: AuthFormTypes) => {
  return (
    <form action={type == "login" ? login : signUp}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="Email">Email</Label>
        <Input name="email" id="Email" type="email" required maxLength={100} />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="Password">Password</Label>
        <Input
          name="password"
          id="Password"
          type="password"
          required
          maxLength={100}
        />
      </div>

      <Button className="my-4 w-full">{`${
        type == "Signup" ? "Sign Up" : "Log In"
      }`}</Button>
    </form>
  );
};

export default AuthForm;
