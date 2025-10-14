import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/Heading";
import SignoutBtn from "@/components/SignoutBtn";
import { checkAuth } from "@/lib/server-utils";
import React from "react";

const Account = async () => {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 items-center justify-center ">
        <p>Signed in as....{session?.user?.email}</p>
        <SignoutBtn />
      </ContentBlock>
    </main>
  );
};

export default Account;
