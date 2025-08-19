import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/Heading";
import React from "react";

const Account = () => {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex items-center justify-center ">
        <p>Signed in as....</p>
      </ContentBlock>
    </main>
  );
};

export default Account;
