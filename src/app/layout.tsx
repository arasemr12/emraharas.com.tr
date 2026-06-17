import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar, { getTheme } from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Emrah Aras (arasemr1234)",
  description: "Emrah Aras (arasemr1234)",
  authors: [{
    name: "Emrah Aras",
  }],
  openGraph: {
    title: "Emrah Aras (arasemr1234)",
    description: "Emrah Aras (arasemr1234)",
    type:"website",
  },
  metadataBase:new URL("https://emraharas.com.tr"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html
      lang="en"
      className={`h-full w-full antialiased no-transition-on-load`}
    >
      <body className={`w-full h-full ${theme}`}>
        <Toaster toastOptions={{
          classNames: {
            toast: "toast"
          }
        }} />
        <NextIntlClientProvider>
          <div className="w-full h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 dark:bg-gray-900 dark:text-white">
              {children}
            </div>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}
