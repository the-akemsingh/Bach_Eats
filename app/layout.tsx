import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavbarProvider from "./NavbarProvider";
import Logo from "@/components/ui/logo";



export const metadata: Metadata = {
  title: "BachEats",
  description: "Find out bachelor's nearby and share meal with them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Logo/>
          <NavbarProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
