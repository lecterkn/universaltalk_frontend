import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/layouts/Sidebar";
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from "@/components/ui/toaster";

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
  title: "UniversalTalk",
  description: "talk app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Toaster />
        </body>
      </html>
    </CookiesProvider>
  );
}
