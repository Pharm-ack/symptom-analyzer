"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LucideLoader2 } from "lucide-react";

export default function PendingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" type="submit">
          <LucideLoader2 className="animate-spin h-4 w-4 mr-2" /> Generating...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          {children}
        </Button>
      )}
    </>
  );
}
