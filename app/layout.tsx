import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Favicon from '/public/favicon.ico'
import { NextAuthProvider } from "../lib/AuthProvider";
import Toast from "@/components/ui/Toast/Toast";
import PopUpCard from "@/components/ui/Toast/PopUpCard";

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
  
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  
  );
}
