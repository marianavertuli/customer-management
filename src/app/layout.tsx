import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { LoaderProvider } from "@/providers/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevControl - Your Management System",
  description: "Easily manage your clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LoaderProvider>
            <ModalProvider>
              <Header/>
                {children}
              <Footer/>
            </ModalProvider>
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
