import type { Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { cn } from '~/utils/cn';

import '~/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f0f0f0',
  colorScheme: 'light',
};

const poppins = Poppins({
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin-ext'],
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" className="antialiased">
    <body className={cn('bg-light-grey', poppins.className)}>{children}</body>
  </html>
);

export default RootLayout;
