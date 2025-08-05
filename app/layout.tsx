import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavbarProvider from "./NavbarProvider";
import Footer from "@/components/page/footer";



export const metadata: Metadata = {
  title: "BachEats",
  description: "Find out bachelors nearby and share meal with them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
    <head>
        <style>
          @import url(&apos;https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap&apos;);
          @import url(&apos;https://fonts.googleapis.com/css2?family=Ms+Madi&display=swap&apos;);
        </style>
      </head>
      <body className="">
        <Providers>
          <NavbarProvider />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
