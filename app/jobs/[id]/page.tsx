// app/jobs/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getJobById, mockJobs } from '@/app/data/jobs';
// Import utility needed for client-side data (even though this is a Server Component)
import { loadCustomJobs } from '@/app/utils/localStorage';
// Import the new ClientActions component
import { ClientActions } from '@/app/components/ClientActions';

// Interface for the component's props (URL parameters)
interface JobDetailPageProps {
    params: {
        id: string;
    };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
    // 1. Load Local Storage jobs on the server for initial render 
    // This is safe because loadCustomJobs returns [] during SSR.
    const customJobs = loadCustomJobs();

    // 2. Find the job using the combined list
    const job = getJobById(params.id, customJobs);

    // 3. Handle case where job is not found
    if (!job) {
        // If the ID doesn't match a job, display a 404 page
        return notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Job Details Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Job Header */}
                    <header className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                            {job.title}
                        </h1>
                        <p className="text-xl text-indigo-600 font-semibold mb-4">${job.budgetUSD.toLocaleString()} USD</p>
                        <p className="text-sm text-gray-500">
                            Posted by {job.client} | {job.postedDaysAgo} days ago
                        </p>
                    </header>

                    {/* Job Description */}
                    <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                    </section>
                </div>

                {/* Sidebar Column (1/3 width) */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Tags / Skills Required */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Skills Required</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit Proposal Button (Freelancer Action) */}
                    <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border-2 border-indigo-200 text-center">
                        <h3 className="text-xl font-bold text-indigo-800 mb-4">Interested?</h3>
                        <button className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150">
                            Submit Proposal
                        </button>
                    </div>

                    {/* 💰 CLIENT ESCROW ACTIONS (New Component) 💰 */}
                    {/* This component acts as a placeholder for the client to release funds */}
                    <ClientActions
                        jobId={job.id}
                        isFundsLocked={job.id === 'job-001' || job.id.startsWith('local-job-')} // MOCK: Assume funds are locked for featured/new jobs
                        freelancerAddress="0x...FreelancerAddress" // Placeholder
                        clientAddress="0x...ClientAddress" // Placeholder
                    />
                </div>
            </div>
        </div>
    );
}