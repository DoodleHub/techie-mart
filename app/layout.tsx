import { Toaster } from 'react-hot-toast';

import './globals.css';

import type { Metadata } from 'next';
import Wrapper from './Wrapper';

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
      <body>
        <Toaster />
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
