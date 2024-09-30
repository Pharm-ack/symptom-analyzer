import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/react";

import SignInPasskey from "@/components/signin-passkey";
import { signIn } from "@/auth";

export default async function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Choose your sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button variant="outline">
              <Icon className="mr-2 h-4 w-4" icon="flat-color-icons:google" />
              Sign in with Google
            </Button>
          </form>

          <SignInPasskey />
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-gray-700 w-full">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
