import BgGradient from "@/components/bg-gradient";
import Hero from "@/components/hero";
import HowItWork from "@/components/how-it-work";
import { Dot } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      <BgGradient />
      <Hero />;
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
      <HowItWork />
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
    </div>
  );
}
