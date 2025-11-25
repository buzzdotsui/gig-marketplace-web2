// app/post-job/page.tsx
'use client'; // <-- MUST be a Client Component to use hooks

import React, { useState, useCallback, useMemo } from 'react';

// TypeScript interface for the form state
interface JobFormState {
    title: string;
    budget: number;
    description: string;
    tagsInput: string;
}

export default function PostJobPage() {
    const [formData, setFormData] = useState<JobFormState>({
        title: '',
        budget: 0,
        description: '',
        tagsInput: '', // Tags will be comma-separated in the input
    });

    // State for success message
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Memoize the available categories for the tags
    const availableCategories = useMemo(() => [
        'Next.js', 'React', 'Sui Move', 'Solidity', 'Design',
        'Content Writing', 'Audit', 'DevOps'
    ], []);

    // Generic handler for all form inputs
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    }, []);

    // Submission handler
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        // 1. Process the tags: split by comma and trim whitespace
        const processedTags = formData.tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        // 2. Create the final job object (simulating what would be sent to the backend/Sui contract)
        const newJob = {
            id: `temp-${Date.now()}`, // Temporary ID
            client: "Current User (Client)", // Placeholder for authenticated user
            postedDaysAgo: 0,
            ...formData,
            tags: processedTags,
            // Remove the temporary tagsInput field
            tagsInput: undefined,
        };

        // 3. MVP Action: Log the object instead of persisting it
        console.log('--- NEW JOB POSTED (MVP LOG) ---');
        console.log(JSON.stringify(newJob, null, 2));
        console.log('---------------------------------');

        // 4. Show success message and reset form
        setIsSubmitted(true);
        setFormData({ title: '', budget: 0, description: '', tagsInput: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);

    }, [formData]);

    if (isSubmitted) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[50vh] flex items-center justify-center">
                <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Success! 🎉</h2>
                    <p className="text-green-700">
                        Your job has been successfully posted (logged to console in this MVP).
                        It is now visible to all freelancers.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
                    >
                        Post Another Job
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Post a New Sui Gig
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Describe the project and set your budget for the freelancers.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6">

                    {/* 1. Job Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Build Responsive Homepage in Next.js/Tailwind"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* 2. Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                            Budget (USD Equivalent) <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="budget"
                                id="budget"
                                min="10"
                                value={formData.budget === 0 ? '' : formData.budget} // Hide 0 when empty
                                onChange={handleChange}
                                required
                                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 850"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Job Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the deliverables, skills required, and timeline."
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>

                    {/* 4. Tags/Skills */}
                    <div>
                        <label htmlFor="tagsInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Skills/Tags (Comma Separated)
                        </label>
                        <input
                            type="text"
                            name="tagsInput"
                            id="tagsInput"
                            value={formData.tagsInput}
                            onChange={handleChange}
                            placeholder="e.g., Next.js, Tailwind CSS, TypeScript, Sui Move"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Suggested: {availableCategories.join(', ')}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                            Post Gig Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}