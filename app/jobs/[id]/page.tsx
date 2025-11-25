// app/jobs/[id]/page.tsx (FINAL UPDATE)
import { notFound } from 'next/navigation';
import { getJobById } from '@/app/data/jobs';
import { loadCustomJobs } from '@/app/utils/localStorage';
import { ClientActions } from '@/app/components/ClientActions';
// Import the new FreelancerActions component
import { FreelancerActions } from '@/app/components/FreelancerActions';

// Interface for the component's props (URL parameters)
interface JobDetailPageProps {
    params: {
        id: string;
    };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
    // Load Local Storage jobs on the server for initial render 
    const customJobs = loadCustomJobs();
    const job = getJobById(params.id, customJobs);

    if (!job) {
        return notFound();
    }

    // --- MOCK LOGIC for simulating different states ---
    // Use job-001 for Client Actions demo
    const isClient = job.id === 'job-001';
    // Use job-002 for Freelancer Actions demo (e.g., claiming)
    const isFreelancer = job.id === 'job-002';
    // --- END MOCK LOGIC ---

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

                    {/* Tags / Skills Required (Remains the same) */}
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

                    {/* Conditional Action Buttons based on MOCK user role */}

                    {isClient ? (
                        // Client: Show the Release Funds button
                        <ClientActions
                            jobId={job.id}
                            isFundsLocked={true}
                            freelancerAddress="0x...FreelancerAddress"
                            clientAddress="0x...ClientAddress"
                        />
                    ) : isFreelancer ? (
                        // Freelancer: Show the Claim/Withdraw buttons
                        <FreelancerActions
                            jobId={job.id}
                            isJobClaimed={false} // Start as unclaimed for demo
                            isFundsReleased={false} // Start as unreleased for demo
                            isFundsWithdrawn={false} // Start as not withdrawn
                        />
                    ) : (
                        // Default: Show the generic "Submit Proposal" button for all other users/jobs
                        <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border-2 border-indigo-200 text-center">
                            <h3 className="text-xl font-bold text-indigo-800 mb-4">Interested?</h3>
                            <button className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150">
                                Submit Proposal
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}