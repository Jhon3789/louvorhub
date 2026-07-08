import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "LouvorHub",
  description: "Sistema de organização do Ministério de Louvor",
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