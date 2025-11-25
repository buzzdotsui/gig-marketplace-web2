// app/post-job/page.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
// Import the necessary utility function for local persistence
import { addJob } from '@/app/utils/localStorage';
import { Job } from '@/app/data/jobs'; // Import the Job interface

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
        tagsInput: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTxLoading, setIsTxLoading] = useState(false); // Used for mock loading

    const availableCategories = useMemo(() => [
        'Next.js', 'React', 'Tailwind', 'Design',
        'Content Writing', 'Audit', 'DevOps', 'Move',
    ], []);

    // Generic handler for all form inputs
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    }, []);

    // Submission handler: Saves data to Local Storage
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        // 1. Process the tags: split by comma and trim whitespace
        const processedTags = formData.tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        // 2. Create the final job object for Local Storage
        const newJob: Job = {
            // Use a timestamp for a unique, local ID
            id: `local-job-${Date.now()}`,
            client: "New Client (Local)",
            postedDaysAgo: 0,
            title: formData.title,
            budgetUSD: formData.budget,
            description: formData.description,
            tags: processedTags,
        };

        // 3. MVP Action: Add the job to Local Storage
        addJob(newJob);
        console.log('New job saved to Local Storage:', newJob.id);

        // 4. Show success message and reset form
        setIsSubmitted(true);
        setFormData({ title: '', budget: 0, description: '', tagsInput: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);

    }, [formData]);


    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Post a New Gig
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Describe the project and set your budget for the freelancers.
                    </p>
                </header>

                {/* Success Message Pop-Up */}
                {isSubmitted && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your gig has been posted (and saved to your browser's local storage).</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6">

                    {/* 1. Job Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Senior Move Developer for Escrow Contract"
                        />
                    </div>

                    {/* 2. Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget (USD)</label>
                        <input
                            type="number"
                            name="budget"
                            id="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            min="1"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Minimum $1"
                        />
                    </div>

                    {/* 3. Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Provide a detailed description of the scope, required skills, and deliverables."
                        />
                    </div>

                    {/* 4. Tags/Skills */}
                    <div>
                        <label htmlFor="tagsInput" className="block text-sm font-medium text-gray-700">
                            Skills / Tags (Comma Separated)
                        </label>
                        <input
                            type="text"
                            name="tagsInput"
                            id="tagsInput"
                            value={formData.tagsInput}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., React, Move, Smart Contract, Design"
                        />
                        <p className="mt-2 text-xs text-gray-500">Suggested: {availableCategories.join(', ')}</p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isTxLoading || formData.budget <= 0}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 
                ${isTxLoading || formData.budget <= 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                        >
                            {isTxLoading ? 'Posting...' : 'Post Gig Now'}
                        </button>
                        <p className='mt-3 text-center text-sm text-gray-500'>In the full dApp, this action would secure the payment via a Sui transaction.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}