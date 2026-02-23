import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GC Shop Control",
  description: "Sistema de gerenciamento de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`
    ${geistSans.variable}
    ${geistMono.variable}
    antialiased
    bg-[#1E1F24]
    text-gray-100
    min-h-screen
    flex
    flex-col
  `}
      >

        {/* HEADER */}
        <header className="
    h-24
    w-full
    bg-[#1E1F24]
    border-b border-[#343741]
    shadow-[0_10px_40px_rgba(42,45,52,0.5)]
    px-8
    flex items-center
    flex-shrink-0
  ">
          <Image
            src="/logo.png"
            alt="GC Shop Control"
            width={120}
            height={45}
            priority
            className="drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]"
          />
        </header>

        {/* CONTEÚDO CENTRAL */}
        <div className="flex flex-1 overflow-hidden">

          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN */}
          <main className="
      flex-1
      overflow-y-auto
      px-10
      py-10
    ">
            {children}
          </main>

        </div>

        {/* FOOTER */}
        <footer className="
    h-14
    w-full
    bg-[#1E1F24]
    border-t border-[#343741]
    shadow-[0_-10px_40px_rgba(42,45,52,0.5)]
    flex items-center justify-center
    text-gray-400 text-sm
    flex-shrink-0
  ">
          © 2026 GC Shop Control — Desenvolvido por Gabriel Cardoso
        </footer>

      </body>
    </html>
  );
}