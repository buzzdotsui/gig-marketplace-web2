// app/components/FreelancerActions.tsx
'use client';

import React, { useState } from 'react';

// NOTE: This component is a placeholder for the future Sui interaction (Claim/Withdraw).
// It currently uses mock logic and state.

interface FreelancerActionsProps {
    jobId: string;
    isJobClaimed: boolean;         // Simulates if a freelancer has started
    isFundsReleased: boolean;      // Simulates if the client has released the payment
    isFundsWithdrawn: boolean;     // Simulates if the freelancer has already withdrawn
}

export const FreelancerActions: React.FC<FreelancerActionsProps> = ({
    jobId,
    isJobClaimed,
    isFundsReleased,
    isFundsWithdrawn
}) => {
    const [isLoading, setIsLoading] = useState(false);

    // State to track if the current user has performed a mock action
    const [mockClaimStatus, setMockClaimStatus] = useState(isJobClaimed);
    const [mockWithdrawStatus, setMockWithdrawStatus] = useState(isFundsWithdrawn);

    // MOCK Function for accepting the job (Future Sui transaction)
    const handleClaimJob = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(`Simulating claim_job for Job: ${jobId}`);
            setMockClaimStatus(true);
            setIsLoading(false);
        }, 1500);
    };

    // MOCK Function for withdrawing funds (Future Sui transaction)
    const handleWithdrawFunds = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(`Simulating withdraw_funds for Job: ${jobId}`);
            setMockWithdrawStatus(true);
            setIsLoading(false);
        }, 2000);
    };

    // --- Render Logic ---

    // 1. Funds Withdrawn (Final State)
    if (mockWithdrawStatus) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mt-6">
                <p className="font-bold">Withdrawal Complete</p>
                <p className="text-sm">Payment has been successfully received. Great work!</p>
            </div>
        );
    }

    // 2. Funds Released, Ready to Withdraw
    if (isFundsReleased) {
        return (
            <div className="border border-green-400 p-6 rounded-xl shadow-lg mt-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-800 mb-4">Payment Ready!</h3>
                <p className="text-gray-700 mb-4">
                    The client has released the escrow funds. You can now withdraw the payment to your wallet.
                </p>
                <button
                    onClick={handleWithdrawFunds}
                    disabled={isLoading}
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition duration-150 flex items-center justify-center"
                >
                    {isLoading ? 'Withdrawing...' : 'Withdraw Funds Now'}
                </button>
            </div>
        );
    }

    // 3. Job Claimed / In Progress (Awaiting Client Action)
    if (mockClaimStatus) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mt-6">
                <p className="font-bold">Job In Progress</p>
                <p className="text-sm">You have claimed this job. Awaiting client review and fund release.</p>
            </div>
        );
    }

    // 4. Job Not Yet Claimed (Initial State)
    return (
        <div className="border border-gray-200 p-6 rounded-xl shadow-lg mt-6 bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Freelancer Actions</h3>

            <p className="text-gray-600 mb-4">
                To start working on this gig, claim it below. This action locks your address to the escrow.
            </p>

            <button
                onClick={handleClaimJob}
                disabled={isLoading}
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-150 flex items-center justify-center"
            >
                {isLoading ? 'Claiming Job...' : 'Claim This Job'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                *Only the wallet that claims the job can later withdraw the funds.
            </p>
        </div>
    );
};