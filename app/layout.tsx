import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "./globals.css";

// Inter como fonte principal da UI (--font-sans que o shadcn/ui usa por padrão)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Geist Mono para valores monetários e números
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PipeFlow CRM",
  description: "CRM de vendas simples e rápido para times e freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("dark font-sans", inter.variable)} suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
