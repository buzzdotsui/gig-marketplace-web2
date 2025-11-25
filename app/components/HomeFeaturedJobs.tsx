// app/components/HomeFeaturedJobs.tsx
'use client';

import Link from 'next/link';
import { JobCard } from '@/app/components/JobCard';
import { useJobs } from '@/app/hooks/useJobs';

export const HomeFeaturedJobs = () => {
    const { jobs, isLoaded } = useJobs();

    // Show only the first 2 jobs (which will be the newest from local storage)
    const featuredJobs = jobs.slice(0, 2);

    if (!isLoaded) {
        return (
            <div className="text-center py-4 text-gray-500">
                Loading featured gigs...
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="text-center mt-12">
                <Link href="/jobs" passHref>
                    <button className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition duration-150">
                        View All {jobs.length} Gigs
                    </button>
                </Link>
            </div>
        </>
    );
};