"use client";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <Button type="button" variant="outline" onClick={() => onClick("google")}>
      <Icon className="mr-2 h-4 w-4" icon="flat-color-icons:google" />
      Continue with Google
    </Button>
  );
}
