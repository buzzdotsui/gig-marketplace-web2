// app/jobs/page.tsx (UPDATED)
import { JobListClient } from '@/app/components/JobListClient';

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Browse All Gigs
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Find the latest freelance opportunities, secured by Sui Escrow.
                    </p>
                </header>

                {/* Use the client component to handle combined data fetching */}
                <JobListClient />

            </div>
        </div>
    );
}