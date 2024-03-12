import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import SideBar from "@/components/shared/SideBar";
import MobileNav from "@/components/shared/MobileNav";

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});


export const metadata: Metadata = {
  title: "Canva",
  description: "Generated by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-ibm-plex">
            <SideBar/>
            <MobileNav/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}