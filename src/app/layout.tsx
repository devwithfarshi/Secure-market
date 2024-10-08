import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sheard/Navbar";
import { cn, constructMetadata } from "@/lib/utils";
import Providers from "@/components/Layouts/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/sheard/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </Providers>
        </main>
        <Toaster position="top-right" richColors duration={1500} />
      </body>
    </html>
  );
}
