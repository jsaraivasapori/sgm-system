import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ou sua fonte preferida
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGM - Soluções Políticas",
  description: "Sistema de Gestão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* Envolva o children com o Provider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
