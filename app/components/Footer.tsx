// app/components/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
    // Footer Link structure for easy mapping
    const quickLinks = [
        { name: 'Browse Gigs', href: '/jobs' },
        { name: 'Post a Job', href: '/post-job' },
        { name: 'Home', href: '/' },
        // Placeholder for a detailed 'Feedback' page (MVP link)
        { name: 'Feedback', href: '#' },
    ];

    return (
        <footer className="bg-gray-800 text-white border-t border-indigo-700 mt-12">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Column 1: App Name & Social */}
                    <div>
                        <h3 className="text-xl font-bold text-indigo-400 mb-4">Sui Gigs DApp</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            The decentralized marketplace for Sui blockchain gigs.
                        </p>

                        {/* Social Link (X/Twitter) */}
                        <a
                            href="https://x.com/SuiMicroGig?s=20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center space-x-2"
                        >
                            {/* Simple X/Twitter icon placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.791-1.574 2.164-2.722-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.593 0-6.471 2.946-6.471 6.57 0 .513.056 1.01.17 1.48C6.671 8.528 3.5 6.845 1.465 4.119.988 4.908.72 5.795.72 6.745c0 2.275 1.159 4.265 2.91 5.422-.486-.02-.94-.14-1.341-.377v.081c0 3.181 2.257 5.792 5.242 6.398-.553.151-1.134.232-1.737.232-.42 0-.822-.041-1.222-.119.834 2.585 3.291 4.475 6.183 4.536-2.204 1.764-4.99 2.824-8.03 2.824-.53 0-1.047-.033-1.564-.084C2.9 22.181 5.862 23.36 9.172 23.36c8.532 0 13.155-7.271 13.155-13.88v-.577c.905-.658 1.688-1.523 2.316-2.529z" />
                            </svg>
                            <span>@SuiMicroGig</span>
                        </a>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact/Legal Placeholder */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                    Dispute Resolution
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Credits and Attribution (UPDATED) */}
                    <div className="md:col-span-1 col-span-2">
                        <h3 className="text-lg font-semibold text-white mb-4">Attribution</h3>
                        <p className="text-gray-400 text-sm">
                            Our platform is built and maintained by the dedicated team at
                            <a
                                href="https://share.google/3RMvjFHJoExxw8R2E"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 font-bold ml-1"
                            >
                                Testy Tech Inc
                            </a>.
                            The project is led by
                            <a
                                href="https://testytech.42web.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 font-bold ml-1"
                            >
                                Testimony Owolabi
                            </a>.
                        </p>
                        <p className="text-gray-500 text-xs mt-4">
                            &copy; {new Date().getFullYear()} Sui Gigs DApp MVP. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};