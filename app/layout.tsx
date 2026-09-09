import type { Metadata } from 'next';
import 'lenis/dist/lenis.css';
import './globals.css';
import './motion-gallery.css';
import './photo-sliders.css';
import './trip-search.css';
import { DesktopSmoothScroll } from './desktop-smooth-scroll';

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
      <body>
        <DesktopSmoothScroll />
        {children}
      </body>
    </html>
  );
}
