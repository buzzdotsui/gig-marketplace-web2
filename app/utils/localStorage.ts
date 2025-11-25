// app/utils/localStorage.ts
import { Job } from '@/app/data/jobs';

// Define the key used to store job data in Local Storage
const JOBS_STORAGE_KEY = 'custom_posted_jobs';

/**
 * Loads custom posted jobs from Local Storage.
 * Should be called inside a client component (useEffect or within a hook).
 * @returns An array of Job objects, or an empty array if none are found.
 */
export function loadCustomJobs(): Job[] {
    if (typeof window === 'undefined') {
        // Return empty array if not in a browser environment (Server Side Rendering)
        return [];
    }

    try {
        const serializedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
        if (serializedJobs === null) {
            return [];
        }
        // Parse the JSON string back into a Job array
        return JSON.parse(serializedJobs) as Job[];
    } catch (error) {
        console.error("Error loading custom jobs from Local Storage:", error);
        return [];
    }
}

/**
 * Saves an array of Job objects to Local Storage.
 * @param jobs - The array of Job objects to save.
 */
export function saveJobs(jobs: Job[]): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const serializedJobs = JSON.stringify(jobs);
        localStorage.setItem(JOBS_STORAGE_KEY, serializedJobs);
    } catch (error) {
        console.error("Error saving custom jobs to Local Storage:", error);
    }
}

/**
 * Adds a single new job to the existing list in Local Storage.
 * @param newJob - The Job object to add.
 */
export function addJob(newJob: Job): void {
    const existingJobs = loadCustomJobs();
    const updatedJobs = [newJob, ...existingJobs]; // Add new job to the beginning
    saveJobs(updatedJobs);
}