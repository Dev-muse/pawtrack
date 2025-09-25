import AuthForm from "@/components/AuthForm";
import H1 from "@/components/Heading";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className=" ">
      <H1 className="mb-5 text-center">Log In</H1>
      <AuthForm />
      <p className="text-center ">
        No account yet? <Link className="text-sm text-zinc-500" href={'/signup'}>Sign up</Link>
      </p>
    </main>
  );
};

export default Login;
