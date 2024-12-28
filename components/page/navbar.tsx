'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { DMSerifFont, MarkaziFont } from "@/app/fonts";
import { motion } from "framer-motion";
import AcceptedInvitesNotification from './notification';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const session = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (route: string) => (pathname === route ? 'text-rose-600' : 'hover:text-rose-500');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const fadeInUp = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
    };

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="container mx-auto px-4"
            >
                <div className="flex items-center justify-between py-4">
                    <motion.div variants={fadeInUp}>
                        <Link href="/" className={`${DMSerifFont.className} text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600`}>
                            BachEats
                        </Link>
                    </motion.div>
                    
                    {/* Hamburger menu for mobile */}
                    <motion.button variants={fadeInUp} onClick={toggleMenu} className="md:hidden text-rose-600">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>

                    {/* Navigation Links */}
                    <motion.nav
                        variants={fadeInUp}
                        className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none ${session?.data?.user ? '' : 'md:block'} md:mt-1 md:mr-2`}
                    >
                        {session?.data?.user ? (
                            <>
                                <Link href="/invitations/new" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/new')} ${MarkaziFont.className} text-lg`}>
                                    Create Invite
                                </Link>
                                <Link href="/invitations/all" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/all')} ${MarkaziFont.className} text-lg`}>
                                    Invitations
                                </Link>
                                <Link href="/invitations/reqreceived" className={`block md:inline-block py-2 px-4 ${isActive('/invitations/reqreceived')} ${MarkaziFont.className} text-lg`}>
                                    Requests
                                </Link>
                                <Link href="/profile" className={`block md:inline-block py-2 px-4 ${isActive('/profile')} ${MarkaziFont.className} text-lg`}>
                                    Profile
                                </Link>
                                <button
                                    className={`block md:inline-block py-2 px-4 w-full md:w-auto text-left md:text-center hover:text-rose-500 ${MarkaziFont.className} text-lg`}
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
                            <>
                                <Link href="/signup" className="block md:inline-block px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm mr-4 mb-2 md:mb-0">
                                    Sign up
                                </Link>
                                <Link href="/signin" className="block md:inline-block px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </motion.nav>
                </div>
            </motion.div>
        </div>
    );
}

export default Navbar;

