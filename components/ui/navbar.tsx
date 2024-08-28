"use client";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { merriweather, poppins } from '@/app/fonts';


function Navbar() {
    const session = useSession();


    return (

        <div
            className={`absolute top-0 left-0 w-full flex  text-white justify-center gap-6 font-extrabold pt-7 pb-5 ${poppins.className}`}
            style={{ backgroundColor: 'transparent', zIndex: 10 }}>
            {session?.data?.user && <>
                <Link href="/" className='transition-transform transform hover:scale-105   hover:text-red-400'>
                    HOME
                </Link>
                <Link href="/invitations/new" className='transition-transform     transform hover:scale-105 hover:text-gray-400'>
                    CREATE INVITE
                </Link>
                <Link href="/invitations/all" className='transition-transform      transform hover:scale-105 hover:text-gray-400'>
                    INVITATIONS
                </Link>
                <div className='flex'>
                    <button
                        onClick={() => {
                            signOut()
                        }}
                        className='transition-transform transform hover:scale-105 hover:text-gray-400'>
                        SIGNOUT
                    </button>

                    <Link href={'/profile'} className='ml-24 top-5 absolute'>
                        <img width="35" height="35" src="https://img.icons8.com/ink/48/person-male.png" alt="person-male" />
                    </Link>
                </div>
            </>
            }
        </div>
    );
};

export default Navbar;
