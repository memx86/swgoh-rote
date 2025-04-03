import React, { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
