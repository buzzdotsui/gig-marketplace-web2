// app/layout.tsx (UPDATED)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// 1. Import the Navbar
import { Navbar } from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sui Gigs DApp MVP',
  description: 'Decentralized Freelancing Platform built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Add the Navbar here */}
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}