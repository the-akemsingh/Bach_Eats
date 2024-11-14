"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import AcceptedInvitesNotification from './notification';
import { Menu, X } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

function Navbar() {
    const session = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (route: any) => (pathname === route ? 'text-red-400' : 'hover:text-pink-500');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 shadow-md ${poppins.className}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="text-3xl font-bold text-pink-600 dark:text-pink-400">BachEats</Link>
                    
                    {/* Hamburger menu for mobile */}
                    <button onClick={toggleMenu} className="md:hidden text-pink-600 dark:text-pink-400">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Navigation Links */}
                    <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none ${session?.data?.user ? '' : 'md:block'} md:mt-1 md:mr-2`}>
                        {session?.data?.user ? (
                            <>
                                <Link href="/invitations/new" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/new')} font-semibold`}>
                                    Create Invite
                                </Link>
                                <Link href="/invitations/all" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/all')} font-semibold`}>
                                    Invitations
                                </Link>
                                <Link href="/invitations/reqreceived" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/reqreceived')} font-semibold`}>
                                    Requests
                                </Link>
                                <Link href="/profile" className={`block md:inline-block py-2 px-4 ${isActive('/profile')} font-semibold`}>
                                    Profile
                                </Link>
                                <button
                                    className="block md:inline-block py-2 px-4 w-full md:w-auto text-left md:text-center hover:text-pink-500 font-semibold"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to sign out?")) {
                                            signOut({ callbackUrl: "/" });
                                        }
                                    }}
                                >
                                    Sign Out
                                </button>
                                <div className="py-2 px-4 md:p-0">
                                    <AcceptedInvitesNotification />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0">
                                <Link
                                    href="/signup"
                                    className={`transition-transform transform text-base md:text-lg border rounded-full py-2 px-6 hover:scale-105 bg-pink-600 text-white text-center font-semibold ${isActive('/signup')}`}
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/signin"
                                    className={`transition-transform transform text-base md:text-lg border border-pink-600 text-pink-600 rounded-full py-2 px-6 hover:scale-105 hover:bg-pink-600 hover:text-white text-center font-semibold ${isActive('/signin')}`}
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;