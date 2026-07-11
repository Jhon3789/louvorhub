import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "./components/components/Sidebar";


export const metadata: Metadata = {
  title: "LouvorHub",
  description: "Ministério de Louvor",
  manifest: "/manifest.webmanifest",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <html lang="pt-BR">

      <body>


        <div className="flex min-h-screen">


          <Sidebar />


          <main className="flex-1">

            {children}

          </main>


        </div>


        <script src="/register-sw.js" />


      </body>

    </html>

  );

}