import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/lib/AuthProvider";
import Favicon from '/public/favicon.ico'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xeratha Hagavi Blog",
  description: "Experimental Xeratha-Hagavi Blog",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
