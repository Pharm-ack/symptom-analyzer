import { signIn } from "@/auth";
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

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Use your Google account to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
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
