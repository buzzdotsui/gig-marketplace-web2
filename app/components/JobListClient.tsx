// app/components/JobListClient.tsx (UPDATED for Search and Filter)
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { JobCard } from '@/app/components/JobCard';
import { useJobs } from '@/app/hooks/useJobs';

// Define all possible tags for the filter UI
const ALL_TAGS = [
    'Next.js', 'React', 'Tailwind', 'Design',
    'Content Writing', 'Audit', 'DevOps', 'Move',
    'Smart Contract', 'Security', 'Writing'
];

export const JobListClient = () => {
    const { jobs, isLoaded } = useJobs();

    // State for Search Input and Tag Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // --- Filtering Logic ---
    const filteredJobs = useMemo(() => {
        let filtered = jobs;
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        // 1. Filter by Search Term (Title or Description)
        if (lowerSearchTerm) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(lowerSearchTerm) ||
                job.description.toLowerCase().includes(lowerSearchTerm)
            );
        }

        // 2. Filter by Selected Tags (must contain ALL selected tags)
        if (selectedTags.length > 0) {
            filtered = filtered.filter(job =>
                selectedTags.every(tag => job.tags.includes(tag))
            );
        }

        return filtered;
    }, [jobs, searchTerm, selectedTags]);

    // --- Tag Toggling Handler ---
    const toggleTag = (tag: string) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag) // Remove tag
                : [...prevTags, tag]             // Add tag
        );
    };

    if (!isLoaded) {
        return (
            <div className="text-center py-20 text-xl text-gray-600">
                Loading gigs...
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Search and Filter UI */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Gigs ({filteredJobs.length} found)</h3>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by title or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />

                {/* Tag Filters */}
                <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-150 
                                ${selectedTags.includes(tag)
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display Filtered Job List */}
            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border rounded-xl border-dashed border-gray-300 bg-white">
                    <p className="text-xl font-medium text-gray-500">No gigs match your current filters.</p>
                    <p className="text-md text-gray-400 mt-2">Try clearing your search term or tags.</p>
                </div>
            )}
        </div>
    );
};