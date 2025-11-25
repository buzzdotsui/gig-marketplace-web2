// app/data/jobs.ts
// NOTE: This file is a Server Component compatible data file. 

// Define the Job structure (important for TypeScript consistency)
export interface Job {
    id: string;
    client: string;
    postedDaysAgo: number;
    title: string;
    budgetUSD: number;
    description: string;
    tags: string[];
}

// Static mock data
export const mockJobs: Job[] = [
    {
        id: "job-001",
        client: "Decentralized Corp",
        postedDaysAgo: 2,
        title: "Build Responsive Homepage for Sui Wallet App",
        budgetUSD: 1200,
        description: "We need a skilled Next.js developer to create a clean, responsive landing page utilizing Tailwind CSS. Must be pixel-perfect based on provided Figma designs. Experience with Web3-style design is a plus.",
        tags: ["Next.js", "Tailwind", "Design", "React"],
    },
    {
        id: "job-002",
        client: "Sui Ecosystem Grant",
        postedDaysAgo: 5,
        title: "Smart Contract Audit for NFT Minting Protocol",
        budgetUSD: 3500,
        description: "Require an experienced Move developer to conduct a thorough security audit of our NFT minting protocol. Focus on re-entrancy, denial-of-service, and correct capability management.",
        tags: ["Move", "Audit", "Smart Contract", "Security"],
    },
    {
        id: "job-003",
        client: "Testy Tech Inc",
        postedDaysAgo: 10,
        title: "Technical Content Writer for Sui Documentation",
        budgetUSD: 800,
        description: "Looking for a writer to create tutorials and documentation for new Sui Move developers, focusing on best practices and basic object lifecycle management.",
        tags: ["Content Writing", "Documentation", "Move", "Writing"],
    },
];

/**
 * Retrieves a single job by its ID, searching both mock data and local storage.
 * NOTE: This function requires the list of custom jobs to be passed in, as 
 * Local Storage cannot be accessed by this Server Component file.
 * @param id The ID of the job to find.
 * @param customJobs (Optional) Array of custom jobs loaded from Local Storage.
 * @returns The found Job object or undefined.
 */
export function getJobById(id: string, customJobs: Job[] = []): Job | undefined {
    // Search the custom jobs first, then the static mock jobs
    return [...customJobs, ...mockJobs].find(job => job.id === id);
}