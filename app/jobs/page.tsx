// app/page.tsx
import Link from 'next/link';
import { JobCard } from '@/app/components/JobCard';
import { mockJobs } from '@/app/data/jobs';

export default function HomePage() {
    // Get the first two jobs to feature on the homepage
    const featuredJobs = mockJobs.slice(0, 2);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* 1. Hero Section: Main Call to Action */}
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

            {/* 2. Featured Jobs Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Featured Gigs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/jobs" passHref>
                            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition duration-150">
                                View All {mockJobs.length} Gigs
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- */}

            {/* 3. Footer Placeholder */}
            <footer className="bg-gray-800 text-white py-10 mt-12">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Sui Gigs DApp MVP. Built with Next.js and Tailwind CSS.
                    </p>
                </div>
            </footer>
        </div>
    );
}