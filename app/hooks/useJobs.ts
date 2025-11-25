// app/hooks/useJobs.ts
'use client';

import { useState, useEffect } from 'react';
import { Job, mockJobs } from '@/app/data/jobs';
import { loadCustomJobs } from '@/app/utils/localStorage';

/**
 * Custom hook to load and combine static mock jobs with user-posted jobs from Local Storage.
 * @returns An array of all visible jobs.
 */
export function useJobs() {
    // Start with just the static mock data for initial SSR render
    const [jobs, setJobs] = useState<Job[]>(mockJobs);

    // Flag to track if the client-side loading has finished
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // This code only runs on the client side (in the browser)
        const customJobs = loadCustomJobs();

        // Combine custom jobs (newest) with mock jobs (oldest)
        const combinedJobs = [...customJobs, ...mockJobs];

        setJobs(combinedJobs);
        setIsLoaded(true);

        // This hook runs only once on component mount
    }, []);

    return { jobs, isLoaded };
}