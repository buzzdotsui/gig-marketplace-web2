// app/components/JobCard.tsx (UPDATED)
import { Job } from '@/app/data/jobs';
import Link from 'next/link'; // <-- Import Link

// Define the props for the component
interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
    return (
        // Card Container
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition duration-300">

            {/* Header Section: Title & Budget */}
            <div className="flex justify-between items-start mb-4">
                {/* Make the title link to the detail page too */}
                <Link href={`/jobs/${job.id}`} className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">
                    {job.title}
                </Link>
                <span className="text-2xl font-extrabold text-indigo-600">
                    ${job.budgetUSD}
                </span>
            </div>

            {/* Client and Time Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <p className="font-medium text-gray-700">Client: {job.client}</p>
                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                <p>Posted {job.postedDaysAgo} days ago</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-5 line-clamp-3">
                {job.description}
            </p>

            {/* Tags/Skills */}
            <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Action Button */}
            <div className="mt-6 text-right">
                {/* Update the button to use the Link component */}
                <Link href={`/jobs/${job.id}`} passHref>
                    <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};