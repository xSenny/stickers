import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster"
import '../globals.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stickers dashboard",
  description: "A dashboard free to test. Made by xSenny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
