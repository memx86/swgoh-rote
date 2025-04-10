import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';
import Header from '../components/Header/Header';
import './globals.css';
import Container from '../components/Container/Container';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ROTE tool',
  description: 'Ukr Rebel Army',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<Loader />}>
          <Header />
          <Container>{children}</Container>
        </Suspense>
      </body>
    </html>
  );
}
