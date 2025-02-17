// components/Header/Header.js
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Logout } from '@mui/icons-material';

export default function Header() {
    const pathname = usePathname();
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        // Function to convert pathname to title
        const convertPathnameToTitle = (path) => {
            const pathSegments = path.split('/').filter(segment => segment !== '');
            if (pathSegments.length === 0) {
                return 'Dashboard'; // Default title for home page
            } else if (pathSegments.length === 1) {
                // Capitalize the first segment and replace hyphens with spaces
                return pathSegments[0].replace(/[-]/g, ' ').charAt(0).toUpperCase() + pathSegments[0].slice(1);
            } else {
                // For nested routes, you might want to handle titles differently
                return pathSegments[pathSegments.length - 1].replace(/[-]/g, ' ').charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1);
            }
        };

        setPageTitle(convertPathnameToTitle(pathname));
    }, [pathname]);

    return (
        <header className="py-4 px-6 flex items-center justify-between hidden md:flex">
            {/* Page Title */}
            <div className="text-lg font-semibold">{pageTitle}</div>

            {/* User Info */}
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl shadow-sm">
                <div className='flex flex-col'>
                    <h6 className="text-sm font-bold">Mizmani Malika</h6>
                    <span className="text-xs text-gray-500">Asekkey</span>
                </div>
              
                {/* Add profile picture here if you have one */}
                {/* Example: <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" /> */}
                <button className="text-gray-500 hover:text-gray-700">
                    <Logout className="h-5 w-5 shadow-lg bg-white rounded-xl p-1" />
                </button>
            </div>
        </header>
    );
}
