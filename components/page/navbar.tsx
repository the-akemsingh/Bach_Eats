"use client";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { jersey_10 } from '@/app/fonts';
import AcceptedInvitesNotification from './notificatoin';



function Navbar() {
    const session = useSession();
    const userId = session.data?.user.id;
    return (
        <div
            className={`absolute top-0 left-0 w-full flex justify-center gap-6 font-extrabold pt-7 pb-5 ${jersey_10.className}`}
        >
            {session?.data?.user ? (
                <>
                    <Link href="/invitations/new" className='transition-transform text-3xl transform hover:scale-105 hover:text-gray-400'>
                        CREATE INVITE
                    </Link>
                    <Link href="/invitations/all" className='transition-transform text-3xl transform hover:scale-105 hover:text-gray-400'>
                        INVITATIONS
                    </Link>
                    <Link href="/invitations/reqreceived" className='transition-transform text-3xl transform hover:scale-105 hover:text-gray-400'>
                        REQUESTS
                    </Link>
                    <Link href="/profile" className='transition-transform text-3xl transform hover:scale-105 hover:text-gray-400'>
                        PROFILE
                    </Link>
                    <div className='flex'>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="transition-transform transform hover:scale-105 text-3xl hover:text-gray-400"
                        >
                            SIGNOUT
                        </button>

                    </div>

                    <div className='relative'>
                       <AcceptedInvitesNotification></AcceptedInvitesNotification>
                    </div>
                </>
            ) : (
                <div className={`flex gap-6 ${jersey_10.className}`}>
                    <Link href="/signup" className='transition-transform transform text-3xl border rounded-3xl pt-2 pb-1 pl-6 pr-6 hover:scale-105 hover:text-red-400 hover:border-red-300 bg-black text-white'>
                        Signup
                    </Link>
                    <Link href="/signin" className='transition-transform transform text-3xl border bg-black text-white rounded-3xl pt-2 pb-2 pl-6 pr-6 hover:scale-105 hover:text-red-400 hover:border-red-300'>
                        Signin
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
