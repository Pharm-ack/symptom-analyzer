"use client";

import { signIn } from "next-auth/webauthn";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@iconify/react";

const RegisterPasskey = () => {
  const { toast } = useToast();
  const router = useRouter();

  const registerPasskey = () => {
    signIn("passkey", { action: "register" }).catch(router.refresh);
    toast({
      title: "🎉 Success! 🎊",
      description: "Registration is successfull!",
    });
  };
  return (
    <Button variant="outline" onClick={registerPasskey}>
      <Icon className="mr-2 h-4 w-4" icon="mdi:key-plus" />
      Register new Passkey
    </Button>
  );
};

export default RegisterPasskey;
