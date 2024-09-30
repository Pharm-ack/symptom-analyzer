import BgGradient from "@/components/bg-gradient";
import Form from "@/components/form";

export default function page() {
  return (
    <BgGradient>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            AI-Powered Symptom Analysis
          </h2>

          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            Describe your symptoms and let our AI provide a preliminary health
            assessment!
          </p>

          <BgGradient>
            <Form />
          </BgGradient>
        </div>
      </div>
    </BgGradient>
  );
}
