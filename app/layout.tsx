import Head from 'next/head';

import { Footer, Navbar } from '@/components';

import './globals.css';

import type { Metadata } from 'next';

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
      <div className="layout">
        <Head>
          <title>TechieMart</title>
        </Head>
      </div>
      <body>
        <header>
          <Navbar />
        </header>
        <main className="main-container">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
