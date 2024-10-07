"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { jersey_10 } from '@/app/fonts';
import AcceptedInvitesNotification from './notification';

function Navbar() {
    const session = useSession();
    const userId = session.data?.user.id;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (route: any) => (pathname === route ? 'text-red-400' : 'hover:text-gray-400');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={`fixed pb-2 top-0 left-0 w-full z-50 bg-white shadow-md ${jersey_10.className}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="text-xl font-bold"></Link>
                    {/* Hamburger menu for mobile */}
                    <button onClick={toggleMenu} className="md:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    {/* Navigation Links */}
                    <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none ${session?.data?.user ? '' : 'md:block'} md:mt-1 md:mr-2`}>
                        {session?.data?.user ? (
                            <>
                                <Link href="/invitations/new" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/new')}`}>
                                    CREATE INVITE
                                </Link>
                                <Link href="/invitations/all" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/all')}`}>
                                    INVITATIONS
                                </Link>
                                <Link href="/invitations/reqreceived" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/reqreceived')}`}>
                                    REQUESTS
                                </Link>
                                <Link href="/profile" className={`block md:inline-block py-2 px-4 ${isActive('/profile')}`}>
                                    PROFILE
                                </Link>
                                <button
                                    className="block md:inline-block py-2 px-4 w-full md:w-auto text-left md:text-center hover:bg-gray-100"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to sign out?")) {
                                            signOut({ callbackUrl: "/" });
                                        }
                                    }}
                                >
                                    SIGNOUT
                                </button>
                                <div className="py-2 px-4 md:p-0">
                                    <AcceptedInvitesNotification />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0">
                                <Link
                                    href="/signup"
                                    className={`transition-transform transform text-base md:text-lg border rounded-3xl py-2 px-6 hover:scale-105 bg-black text-white text-center ${isActive('/signup')}`}
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/signin"
                                    className={`transition-transform transform text-base md:text-lg border bg-black text-white rounded-3xl py-2 px-6 hover:scale-105 text-center ${isActive('/signin')}`}
                                >
                                    Signin
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