"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Logout() {
  return (
    <div>
      <Button
        variant="ghost"
        size="default"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign Out</span>
      </Button>
    </div>
  );
}
