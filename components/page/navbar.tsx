
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { motion } from "framer-motion";
import AcceptedInvitesNotification from './notification';
import { User, ChevronDown, Edit, NotebookIcon, MessageCircleIcon } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar"
import { usePathname } from 'next/navigation';

function Navbar() {
    const session = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const pathname = usePathname();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    useEffect(() => {
        // Define all possible navigation items including home
        const allNavItems = [
            { name: 'Home', url: '/' },
            { name: 'Create Invite', url: '/invitations/new' },
            { name: 'Invitations', url: '/invitations/all' },
            { name: 'Requests', url: '/invitations/reqreceived' }
        ];

        // Find the matching nav item based on the current pathname
        const matchingItem = allNavItems.find(item => {
            if (item.url === '/') {
                // For home page, exact match only
                return pathname === '/';
            } else {
                // For other pages, check if pathname includes the URL
                return pathname.includes(item.url);
            }
        });

        if (matchingItem) {
            setActiveTab(matchingItem.name);
        }
    }, [pathname]);

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const navItems = session?.data?.user ? [
        { name: 'Create Invite', url: '/invitations/new', icon: Edit },
        { name: 'Invitations', url: '/invitations/all', icon: NotebookIcon },
        { name: 'Requests', url: '/invitations/reqreceived', icon: MessageCircleIcon },
    ] : [];

    return (
        <div className="top-0 left-0 px-6 sm:px-10 w-full z-50 ">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="container mx-auto"
            >
                <div className="flex items-center justify-between py-4">
                    <h1 className={`fixed top-6 cal-sans text-4xl sm:text-5xl z-50`}>
                        <Link 
                            href="/"
                            onClick={() => setActiveTab('Home')}
                        >
                            BachEats.
                        </Link>
                    </h1>
                    <NavBar 
                        items={navItems} 
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    
                    {/* User dropdown menu */}
                    {session?.data?.user && (
                        <div className="fixed cal-sans top-6 right-6 z-50 user-dropdown">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2  hover:bg-rose-200 text-rose-600 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                <User className="w-6 h-6" />
                                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1"
                                >                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-rose-50  hover:text-rose-600 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <User className="w-6 h-6" />
                                        <span>Profile</span>
                                    </Link>
                                      <AcceptedInvitesNotification />
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            if (confirm("Are you sure you want to sign out?")) {
                                                signOut({ callbackUrl: "/" });
                                            }
                                        }}
                                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200 text-left"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Navbar;
