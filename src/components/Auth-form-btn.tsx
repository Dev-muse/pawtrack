"use client";


import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  type: "login" | "Signup";
};

const AuthFormBtn = ({ type }: AuthFormBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="my-4 w-full">{`${
      type == "Signup" ? "Sign Up" : "Log In"
    }`}</Button>
  );
};

export default AuthFormBtn;
