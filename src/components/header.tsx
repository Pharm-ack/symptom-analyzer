"use client";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logout from "./logout";
import { useSession } from "next-auth/react";
import useScroll from "@/hooks/use-scroll";
import { HeartPulse } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const { data: session, status } = useSession();
  const isScrolled = useScroll(50);

  return (
    <header
      className={`container sticky top-0 z-50 h-16 w-full ${
        isScrolled
          ? "border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      } `}
    >
      <nav className="flex h-16 w-full items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <HeartPulse className="h-6 w-6 text-black" />
          <span className="hidden sm:flex ml-2 text-xl font-bold">
            AI Health Checker
          </span>
        </Link>
        <div className="gap-4">
          {status === "loading" ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
          ) : session?.user ? (
            <div className="flex items-center justify-center gap-x-3">
              <Link
                href="/result"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "px-4"
                )}
              >
                Results
              </Link>

              <Logout />
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-5 h-8 sm:h-9 rounded-full"
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
