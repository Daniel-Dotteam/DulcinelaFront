import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ClientLayout } from "./client-layout";
import 'rsuite/dist/rsuite.min.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dulcinela - Advent Calendar",
  description: "Patiseria Dulcinella. 100% Calitate. Livrare oriunde în Moldova cu Certificat de Calitate. +373 6002 58 58. Torturi, Prajituri, Macarons, Biscuiti, Placinte, Colaci, Ciocolata, Raw & Vegane. la Comanda. Chisinau, Balti, Hincesti.",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientLayout>
            <main>{children}</main>
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
