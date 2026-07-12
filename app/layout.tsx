import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "LouvorHub",
  description: "Ministério de Louvor",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="pt-BR">

      <body>

        {children}

      </body>

    </html>

  );

}