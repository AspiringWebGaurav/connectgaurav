import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnectGaurav",
  description: "ConnectGaurav Enterprise Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <NextTopLoader
          color="#F97316"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #F97316,0 0 5px #F97316"
        />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" richColors theme="light" />
      </body>
    </html>
  );
}
