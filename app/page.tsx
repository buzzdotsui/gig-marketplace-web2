// app/page.tsx (FINAL UPDATE)
import Link from 'next/link';
// Import the new client component
import { HomeFeaturedJobs } from '@/app/components/HomeFeaturedJobs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 1. Hero Section: Main Call to Action (Remains the same) */}
      <section className="bg-white pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            The Decentralized Freelance Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Find or post your next gig on the Sui blockchain. Secure escrow, fast transactions, and community governance.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/jobs" passHref>
              <button className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-150 transform hover:scale-[1.02]">
                Find a Gig →
              </button>
            </Link>
            <Link href="/post-job" passHref>
              <button className="w-full sm:w-auto px-8 py-3 border border-indigo-200 text-base font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition duration-150">
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 2. Featured Jobs Section (Now uses the Client Component) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Gigs
          </h2>

          {/* Renders the combined, client-side list */}
          <HomeFeaturedJobs />

        </div>
      </section>

      {/* --- */}

      {/* 3. Footer Placeholder (Footer is now in layout.tsx) */}
      {/* The separate footer block is now removed as it's in layout.tsx */}

    </div>
  );
}