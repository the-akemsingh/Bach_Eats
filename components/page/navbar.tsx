"use client";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { calistoga, jersey_10, poppins } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import myacceptedRequests from '@/app/actions/myacceptedRequests';

interface acceptedInvites {
    id: string;
    inviteId: string;
    guestId: string;
}

function Navbar() {
    const session = useSession();
    const Router = useRouter();
    const [notification, setNotification] = useState<acceptedInvites[] | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false); // Popup toggle
    const popupRef = useRef<HTMLDivElement | null>(null); // For outside click detection

    const userId = session.data?.user.id;

    useEffect(() => {
        async function fetchNotifications() {
            if (!userId) return;
            const res = await myacceptedRequests(userId as string);
            if (res.status == 200) {
                setNotification(res.invites as acceptedInvites[]);
            }
        }
        fetchNotifications();
    }, [userId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                            onClick={async () => {
                                await signOut();
                                Router.push("/");
                            }}
                            className='transition-transform transform hover:scale-105 text-3xl hover:text-gray-400'>
                            SIGNOUT
                        </button>
                    </div>

                    <div className='relative'>
                        <button className='mt-2 ml-2 transition-transform hover:scale-105 ' onClick={() => setShowPopup(!showPopup)}>
                            <Image alt='notification' src={'/images/notification.svg'} height={30} width={30} />
                        </button>
                        {showPopup && notification && (
                            <div
                                ref={popupRef}
                                className={`absolute top-12 right-0 bg-black text-white p-4 rounded-lg shadow-lg z-50 min-w-max transition-transform transform ${poppins.className}`}
                            >
                                <h3 className="font-bold text-lg mb-2">Accepted Proposals</h3>
                                {notification.length > 0 ? (
                                    notification.map((invite) => (
                                        <div key={invite.id} className="mb-2">
                                            <p>Invite ID: {invite.inviteId}</p>
                                            <p>Guest ID: {invite.guestId}</p>
                                        </div>
                                    ))
                                ) : (null)}
                            </div>
                        )}
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
