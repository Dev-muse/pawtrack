import AuthForm from "@/components/AuthForm";
import H1 from "@/components/Heading";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return ( 
    <main className=" ">
      <H1 className="mb-5 text-center">Sign Up</H1>
    <AuthForm  type="Signup" />
      <p className="text-center ">
        Already have an account? <Link className="text-sm text-zinc-500" href={'/login'}>Login</Link>
      </p>
    </main>
  );
};
 
export default SignUp;
