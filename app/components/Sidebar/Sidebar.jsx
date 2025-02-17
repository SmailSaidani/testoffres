// components/Sidebar/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
    HomeIcon,
    DocumentDuplicateIcon,
    BellIcon,
    UserIcon,
    FolderIcon,
    UsersIcon,
    ReceiptRefundIcon,
    QuestionMarkCircleIcon,
    PlusIcon,
    XMarkIcon, // Import XMarkIcon for close button
    Bars3Icon, // Import Bars3Icon for hamburger menu
} from '@heroicons/react/24/outline';
import { BriefcaseIcon, DocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { Logout } from '@mui/icons-material'; // Import Logout icon

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse
    const sidebarRef = useRef(null);

    // Function to toggle the sidebar collapse state
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Close the sidebar if a click occurs outside of it when it is not collapsed
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !isCollapsed) {
                setIsCollapsed(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCollapsed]);

    return (
        <>
            {/* Sidebar Header for Mobile View */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between p-4 z-50">
                <button onClick={toggleSidebar} className="bg-white rounded-full p-2">
                    {/* Dynamically switch between hamburger and close icons */}
                    {isCollapsed ? <Bars3Icon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
                </button>
                <Link href="/" className="flex items-center">
                    <img src="/logo.svg" alt="AsekKey Logo" className="h-8" />
                </Link>
            </div>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`bg-white w-64 h-full py-6 px-3 flex-shrink-0 border-r border-gray-200 fixed top-16 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="block mb-10">
                    <img src="/logo.svg" alt="AsekKey Logo" className="h-8" />
                </Link>

                {/* Navigation */}
                <nav>
                    <ul>
                        <SidebarTitle title="Mon Portefeuille" />
                        <SidebarLink href="/mon-portefeuille" label="Mon portefeuille" active={pathname === '/mon-portefeuille'} icon={HomeIcon} />

                        <SidebarTitle title="Mes Affaires" />
                        <SidebarLink href="/offers" label="Mes offres" active={pathname === '/offers'} icon={BriefcaseIcon} />
                        <SidebarLink href="/mes-devis" label="Mes devis" active={pathname === '/mes-devis'} icon={DocumentIcon} />
                        <SidebarLink href="/mes-contrats" label="Mes contrats" active={pathname === '/mes-contrats'} icon={ClipboardDocumentCheckIcon} />

                        <SidebarTitle title="Mon Compte" />
                        <SidebarLink href="/mon-cabinet" label="Mon cabinet" active={pathname === '/mon-cabinet'} icon={FolderIcon} />
                        <SidebarLink href="/mes-informations" label="Mes informations" active={pathname === '/mes-informations'} icon={UserIcon} />
                        <SidebarLink href="/mes-documents" label="Mes documents" active={pathname === '/mes-documents'} icon={DocumentDuplicateIcon} />
                        <SidebarLink href="/mes-collaborateurs" label="Mes collaborateurs" active={pathname === '/mes-collaborateurs'} icon={UsersIcon} />
                        <SidebarLink href="/mes-bordereaux" label="Mes bordereaux" active={pathname === '/mes-bordereaux'} icon={ReceiptRefundIcon} />

                        <SidebarTitle title="Support" />
                        <SidebarLink href="/besoin-d-aide" label="Besoin d'aide" active={pathname === '/besoin-d-aide'} icon={QuestionMarkCircleIcon} />
                        <SidebarLink href="/logout" label="Logout" active={pathname === '/Logout'} icon={Logout} className="mt-4" />

                    </ul>
                </nav>

                {/* Create a quote button */}
                <div className="mt-auto">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Créer un devis
                    </button>
                </div>

                {/* Logout Button at the bottom of Sidebar */}
                
            </aside>

            {/* Overlay for Sidebar */}
            {!isCollapsed && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30" onClick={toggleSidebar}></div>
            )}
        </>
    );
}

function SidebarLink({ href, label, active, icon: Icon }) {
    return (
        <li className={`mb-1 ${active ? 'bg-yellow-50' : ''}`}>
            <Link href={href} className={`block py-2 px-4 rounded hover:bg-gray-100 ${active ? 'font-medium text-yellow-700' : 'text-gray-700'} flex items-center`}>
                <Icon className="h-5 w-5 mr-2" />
                {label}
            </Link>
        </li>
    );
}

function SidebarTitle({ title }) {
    return (
        <li className="text-xs text-gray-500 uppercase mt-4 mb-2 px-4">
            {title}
        </li>
    );
}
