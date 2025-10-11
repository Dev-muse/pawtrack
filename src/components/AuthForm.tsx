import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login } from "@/actions/action";
type AuthFormTypes = {
  type: "login" | "Signup";
};
const AuthForm = ({ type }: AuthFormTypes) => {
  return (
    <form action={login}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="Email">Email</Label>
        <Input name="email" id="Email" type="email" />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="Password">Password</Label>
        <Input name="password" id="Password" type="password" />
      </div>

      <Button className="my-4 w-full">{`${
        type == "Signup" ? "Sign Up" : "Log In"
      }`}</Button>
    </form>
  );
};

export default AuthForm;
