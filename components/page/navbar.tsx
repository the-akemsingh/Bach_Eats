"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { signOut, useSession } from 'next-auth/react';
import { jersey_10 } from '@/app/fonts';
import AcceptedInvitesNotification from './notification';

function Navbar() {
    const session = useSession();
    const userId = session.data?.user.id;
    const pathname = usePathname(); 

    const isActive = (route:any) => pathname === route ? 'text-red-400' : 'hover:text-gray-400';

    return (
        <div
            className={`absolute top-0 left-0 w-full flex justify-center gap-6  pt-7 pb-5 ${jersey_10.className}`}
        >
            {session?.data?.user ? (
                <>
                    <Link href="/invitations/new" className={`transition-transform text-2xl transform hover:scale-105 ${isActive('/invitations/new')}`}>
                        CREATE INVITE
                    </Link>
                    <Link href="/invitations/all" className={`transition-transform text-2xl transform hover:scale-105 ${isActive('/invitations/all')}`}>
                        INVITATIONS
                    </Link>
                    <Link href="/invitations/reqreceived" className={`transition-transform text-2xl transform hover:scale-105 ${isActive('/invitations/reqreceived')}`}>
                        REQUESTS
                    </Link>
                    <Link href="/profile" className={`transition-transform text-2xl transform hover:scale-105 ${isActive('/profile')}`}>
                        PROFILE
                    </Link>
                    <div className='flex'>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure you want to sign out?")) {
                                    signOut({ callbackUrl: "/" });
                                }
                            }}
                            className="transition-transform transform mb-1 hover:scale-105 text-2xl hover:text-gray-400"
                        >
                            SIGNOUT
                        </button>
                    </div>
                    <div className='relative'>
                        <AcceptedInvitesNotification />
                    </div>
                </>
            ) : (
                <div className={`flex gap-6 ${jersey_10.className}`}>
                    <Link href="/signup" className={`transition-transform transform text-2xl border rounded-3xl pt-2 pb-1 pl-6 pr-6 hover:scale-105 bg-black text-white ${isActive('/signup')}`}>
                        Signup
                    </Link>
                    <Link href="/signin" className={`transition-transform transform text-2xl border bg-black text-white rounded-3xl pt-2 pb-2 pl-6 pr-6 hover:scale-105 ${isActive('/signin')}`}>
                        Signin
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
