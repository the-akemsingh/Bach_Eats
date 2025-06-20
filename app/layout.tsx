import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavbarProvider from "./NavbarProvider";



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
          @import url('https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap');
        </style>
      </head>
      <body className="">
        <Providers>
          <NavbarProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
