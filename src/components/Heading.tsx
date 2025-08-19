import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type H1Props = {
  children: ReactNode;
  className?: string;
};

function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("font-medium leading-6 text-2xl", className)}>
      {children}
    </h1>
  );
}

export default H1;
