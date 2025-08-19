import { cn } from "@/lib/utils";
import React from "react";
type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};
function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-md rounded-sm overflow-hidden size-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
