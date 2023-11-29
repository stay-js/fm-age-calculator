import type { Metadata, Viewport } from 'next';
import { AgeCalculator } from '~/components/age-calculator';

const title = 'Frontend Mentor | Age calculator app';
const description =
  'This is a solution to the Age calculator app challenge on Frontend Mentor. Built with Next.js and Tailwind CSS.';

export const metadata: Metadata = {
  metadataBase: new URL('https://fm-age-calculator.znagy.hu'),

  authors: [{ name: 'Zétény Nagy', url: 'https://znagy.hu' }],
  creator: 'Zétény Nagy',

  keywords:
    'frontend mentor, frontend, mentor, fem, age calculator, age, calculator, challenge, next.js, nextjs, react, react-hook-form, zod, tailwind, tailwindcss',

  title,

  applicationName: title,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: `https://fm-age-calculator.znagy.hu`,
    title: description,
    siteName: title,
    locale: 'en-US',
  },

  twitter: {
    card: 'summary',
    title: title,
    description,
  },

  icons: {
    icon: '/favicon-32x32.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f0f0f0',
  colorScheme: 'light',
};

const Page = () => (
  <main className="grid min-h-screen w-screen place-content-center p-6">
    <AgeCalculator />
  </main>
);

export default Page;
