import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import './globals.css';

import type { Metadata } from 'next';
import Wrapper from './wrapper';

export const metadata: Metadata = {
  title: 'TechieMart',
  description: 'Market with the latest tech.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>TechieMart</title>
      </Head>
      <body>
        <Toaster />
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
