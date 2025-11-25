// app/jobs/[id]/page.tsx
import { mockJobs } from '@/app/data/jobs';
import { notFound } from 'next/navigation';

// Define the expected props structure for a dynamic route page
interface JobDetailPageProps {
    params: {
        id: string; // The ID will come from the URL, e.g., /jobs/job-001
    };
}

// This is a Server Component, perfect for fetching data before rendering
export default function JobDetailPage({ params }: JobDetailPageProps) {
    // 1. Find the job that matches the ID from the URL parameters
    const job = mockJobs.find((j) => j.id === params.id);

    // 2. If no job is found, show the Next.js 404 page
    if (!job) {
        notFound();
    }

    // Helper function to format the budget
    const formatBudget = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="bg-white p-8 rounded-xl shadow-xl mb-8">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                        Posted by {job.client} &bull; {job.postedDaysAgo} days ago
                    </p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                        {job.title}
                    </h1>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        {/* Budget Display */}
                        <div className='flex flex-col'>
                            <p className="text-sm font-medium text-gray-500">Budget</p>
                            <span className="text-3xl font-extrabold text-indigo-600">
                                {formatBudget(job.budgetUSD)}
                            </span>
                        </div>

                        {/* Submit Proposal Button (The key action) */}
                        <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
                            Submit Proposal
                        </button>
                    </div>
                </div>

                {/* Detail Content Section */}
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                        Detailed Description
                    </h2>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-8">
                        {/* In a real app, this would be markdown. For MVP, we'll just show the text. */}
                        {job.description}

                        {/* Add some dummy filler to make the page look more detailed */}
                        {"\n\n"}
                        **Project Scope:**
                        The final deliverable should be a fully functioning, tested, and documented codebase. We require all assets and source files upon completion.

                        **Milestones:**
                        1. Design Sign-off (5%)
                        2. Core Feature Implementation (60%)
                        3. Final Review & Bug Fixes (35%)

                        All payments will be secured via **Sui Escrow Smart Contract** upon acceptance of the final work.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                        Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {job.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}