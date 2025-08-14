import React from "react";

function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f7f8fa] shadow-md rounded-sm overflow-hidden size-full">
      {children}
    </div>
  );
}

export default ContentBlock;
