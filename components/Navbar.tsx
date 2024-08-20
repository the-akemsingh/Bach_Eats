"use client";
import Link from 'next/link';
// import {  merriweather } from '../app/fonts';
import { signOut, useSession } from 'next-auth/react';
import { merriweather } from '@/app/fonts';

function Navbar() {
    const session = useSession();

    return (
        <div
            className={` flex justify-center gap-6 font-bold pt-7 pb-5 ${merriweather.className} `}
        >
            <Link href="/" className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                Home
            </Link>
            <Link href="/invitations/new" className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                Create Invite
            </Link>
            <Link href="/invitations/all" className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                Invitations
            </Link>

            {!session?.data?.user? (
                <div className='flex gap-6'>
                    <Link href="/signin" className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                        SignIn
                  </Link>
                    <Link href="/signup" className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                        SignUp
                    </Link>
                </div>
            ) : (
                <div className='flex'>
                    <button
                        onClick={() => {
                            signOut()
                        }}
                        className='transition-transform transform hover:scale-105  hover:text-gray-400'>
                        SignOut
                    </button>

                    {/* <Link href={'/profile'} className='ml-24 top-5 absolute'>
                        <img width="35" height="35" src="https://img.icons8.com/ink/48/person-female.png" alt="person-female" />
                    </Link> */}
                    
                    <Link href={'/profile'} className='ml-24 top-5 absolute'>
                        <img width="35" height="35" src="https://img.icons8.com/ink/48/person-male.png" alt="person-male" />

                    </Link>
                </div>)}
        </div >
    );
};

export default Navbar;