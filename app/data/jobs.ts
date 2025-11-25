// app/data/jobs.ts

// 1. Define the TypeScript Interface for a Job
export interface Job {
    id: string;
    title: string;
    client: string;
    description: string;
    budgetUSD: number;
    tags: string[];
    postedDaysAgo: number;
}

// 2. Mock Data Array
export const mockJobs: Job[] = [
    {
        id: "job-001",
        title: "Build Responsive Homepage in Next.js/Tailwind",
        client: "DesignCo LLC",
        description:
            "We need a seasoned React/Next.js developer to build a pixel-perfect, fully responsive landing page based on our Figma design. Must be skilled in utility-first CSS.",
        budgetUSD: 850,
        tags: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
        postedDaysAgo: 2,
    },
    {
        id: "job-002",
        title: "Solidity Smart Contract Audit (Web3 Gig)",
        client: "DeFi Protocol A",
        description:
            "Looking for an experienced blockchain security expert to review and audit three core Solidity smart contracts for potential vulnerabilities before mainnet launch.",
        budgetUSD: 3000,
        tags: ["Solidity", "Smart Contract", "Audit", "Security"],
        postedDaysAgo: 5,
    },
    {
        id: "job-003",
        title: "Content Writer for Tech Blog (10 Articles)",
        client: "Blogging SaaS",
        description:
            "Require a technical writer to create 10 articles (1000-1500 words each) on modern web development topics (e.g., Server Components, Zustand, Vitest).",
        budgetUSD: 1200,
        tags: ["Content Writing", "Technical", "Blogging", "SEO"],
        postedDaysAgo: 1,
    },
];