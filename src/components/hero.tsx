import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import ShimmerButton from "./magicui/shimmer-button";
import RetroGrid from "./magicui/retro-grid";

export default function Hero() {
  return (
    <div className="relative">
      <section className="relative max-w-full mx-auto">
        <RetroGrid />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12  md:px-8">
          <div className="space-y-5 max-w-3xl leading-0  lg:leading-5 mx-auto text-center">
            <h1 className="text-sm group border border-gray-300 font-sanG mx-auto px-5 py-2 rounded-3xl w-fit">
              Build products for everyone
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>

            <h1 className="font-heading text-4xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Powered Health Symptom Analyzer
            </h1>
            <p className="max-w-3xl mx-auto leading-normal text-center text-muted-foreground sm:text-xl sm:leading-8">
              Get instant insights about your health symptoms using advanced
              artificial intelligence. Fast, accurate, and always available.
            </p>

            <div className="flex items-center justify-center ">
              <Link href="/dashboard">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Start Symptom Check
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
