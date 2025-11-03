"use client";

import { login, signUp } from "@/actions/action";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import AuthFormBtn from "./Auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormTypes = {
  type: "login" | "Signup";
};
const AuthForm = ({ type }: AuthFormTypes) => {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogin] = useFormState(login, undefined);
  return (
    <form action={type == "login" ? dispatchLogin : dispatchSignUp}>
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
      {signUpError?.message && (
        <p className="text-red-500 text-sm my-2">{signUpError?.message}</p>
      )}
      {logInError?.message && (
        <p className="text-red-500 text-sm my-2">{logInError?.message}</p>
      )}

      <AuthFormBtn type={type} />
    </form>
  );
};

export default AuthForm;
