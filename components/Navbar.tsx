"use client"
import Link from 'next/link';
import { merriweather } from '../app/fonts';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';

async function getUser() {
    const session = await getServerSession();
    return session;
  }
  


  async function Navbar ()  {
    const session = await getUser();

    return (
        <div className={`flex justify-center gap-6 font-bold text-white bg-black pt-5 pb-5 ${merriweather.className}`}>
            <Link href="/"  className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'>
                Home
            </Link>
            <Link href="/invitations/new"  className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'>
                Create Invite
            </Link>
            <Link href="/invitations/all"  className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'>
                Invitations
            </Link>

            {/* {(!session?.user) && */}
                <div className='flex gap-6'>
                    <Link href="/signin"  className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'>
                        SignIn
                    </Link>
                    <Link href="/signup"  className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'>
                        SignUp
                    </Link>
                </div>
            {/* } */}
            <button
                onClick={ () => {
                    signOut()
                }}
                className='transition-transform transform hover:scale-105 hover:shadow-xl hover:text-gray-400'
            >
                SignOut
            </button>

            <div>
                {JSON.stringify(session)}
            </div>
        </div>
    );
};

export default Navbar;
