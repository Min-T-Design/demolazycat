import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/assets/header-imgLogo.svg' },
  title: 'Lazy Cat — Ha Giang Loop Tours | Stay. Ride. Explore.',
  description:
    'Discover Vietnam with Lazy Cat. Small-group Ha Giang Loop motorbike tours, authentic local experiences, and memories to last a lifetime.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
