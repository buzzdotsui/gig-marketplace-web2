// app/components/Navbar.tsx
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo / Site Name */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">
                            Sui Gigs DApp
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink href="/" label="Home" />
                            <NavLink href="/jobs" label="Browse Gigs" />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                        <Link href="/post-job" passHref>
                            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md">
                                Post a Job
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Simple reusable link component
interface NavLinkProps {
    href: string;
    label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => (
    <Link
        href={href}
        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
    >
        {label}
    </Link>
);