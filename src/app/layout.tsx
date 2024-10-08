import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Health Symptom Checker",
  description:
    "Analyze your symptoms and receive potential conditions and treatment suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💝</text></svg>"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] fade-in antialiased`}
      >
        <SessionProvider>
          <Header />
          <main className="flex-grow">
            {children}
            <Toaster />
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
