"use client";

import { signIn } from "next-auth/webauthn";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const SignInPasskey = () => {
  const signInWithPasskey = () => {
    signIn("passkey").catch(() => {
      router.refresh();
      return;
    });
  };
  const router = useRouter();
  return (
    <>
      <Button variant="outline" onClick={signInWithPasskey}>
        <Icon className="mr-2 h-4 w-4" icon="mdi:passport-biometric" />
        Sign in with Passkey
      </Button>
    </>
  );
};

export default SignInPasskey;
