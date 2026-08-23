import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bibaho Hub — Find Your Life Partner',
  description:
    'Find meaningful, values-driven connections on Bibaho Hub — the trusted matrimony platform for South Asians worldwide.',
  openGraph: {
    title: 'Bibaho Hub — Find Your Life Partner',
    description:
      'Subscription-based matrimony platform with verified profiles, smart matching, and secure messaging.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bibaho Hub — Find Your Life Partner',
    description:
      'Find meaningful connections on Bibaho Hub — the trusted matrimony platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
