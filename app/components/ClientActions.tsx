// app/components/ClientActions.tsx
'use client';

import React, { useState } from 'react';

// NOTE: This component is a placeholder for the future Sui interaction. 
// It currently uses mock logic and state.

interface ClientActionsProps {
    jobId: string;
    isFundsLocked: boolean; // Simulates the state of the escrow
    freelancerAddress: string;
    clientAddress: string;
}

export const ClientActions: React.FC<ClientActionsProps> = ({
    jobId,
    isFundsLocked,
    freelancerAddress
}) => {
    // Mock state for transaction loading
    const [isLoading, setIsLoading] = useState(false);
    const [releaseStatus, setReleaseStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // MOCK Function for releasing funds (Future Sui transaction)
    const handleReleaseFunds = () => {
        if (!isFundsLocked) {
            alert('Error: Funds are already released or not locked.');
            return;
        }

        // --- Start Mock Transaction Simulation ---
        setIsLoading(true);
        setReleaseStatus('idle');

        setTimeout(() => {
            // Simulate a successful Sui transaction
            console.log(`Simulating release_funds for Job: ${jobId} to Freelancer: ${freelancerAddress}`);

            // In a real dApp, you would check the transaction result here.

            setIsLoading(false);
            setReleaseStatus('success');

        }, 2000);
        // --- End Mock Transaction Simulation ---
    };

    if (releaseStatus === 'success') {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mt-6">
                <p className="font-bold">Payment Complete!</p>
                <p className="text-sm">The funds have been successfully released to the freelancer. The escrow is closed.</p>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 p-6 rounded-xl shadow-lg mt-6 bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Client Escrow Actions</h3>

            <p className="text-gray-600 mb-4">
                This action confirms the work is complete and triggers the **on-chain payment** to the freelancer.
            </p>

            {isFundsLocked ? (
                <button
                    onClick={handleReleaseFunds}
                    disabled={isLoading}
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-150 flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Releasing Funds...
                        </>
                    ) : (
                        `Release Funds: $1200 USD` // Budget amount placeholder
                    )}
                </button>
            ) : (
                <div className="text-center py-3 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg">
                    Funds already released or gig is not active.
                </div>
            )}

            {/* Placeholder for future wallet/address check */}
            <p className="text-xs text-gray-500 mt-4">
                *Must be signed by the **original client address** to execute.
            </p>
        </div>
    );
};