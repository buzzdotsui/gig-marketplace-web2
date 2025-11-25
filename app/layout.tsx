// app/layout.tsx (FINAL CORRECTED WEB2 VERSION)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Initialize the Inter font
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
    // 1. HTML tag must be here, at the root of the component return
    <html lang="en">
      {/* 2. BODY tag must be here, wrapping the entire application UI */}
      <body className={inter.className}>
        {/* 3. The sticky footer structural wrapper (flex-col min-h-screen) is now INSIDE the body */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}