import type { Metadata } from "next";
import "./globals.css";


export const metadata = {
  title: "LouvorHub",
  description: "Ministério de Louvor",
  manifest: "/manifest.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="pt-BR">

      <body>

        {children}


        <script src="/register-sw.js" />


      </body>

    </html>

  );

}