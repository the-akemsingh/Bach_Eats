"use client"

import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import myacceptedRequests from "@/app/actions/myacceptedRequests";
import { poppins } from "@/app/fonts";
import getInvitebyId from "@/app/actions/getInviteByID";
import { useRouter } from "next/navigation";
import { acceptedInvites, inviteType } from "@/types";

export default function AcceptedInvitesNotification() {
    const session = useSession();
    const userId = session.data?.user.id;
    const router = useRouter();

    const [notification, setNotification] = useState<acceptedInvites[] | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [invites, setInvites] = useState<inviteType[] | null>(null);

    const popupRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

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
        const fetchInvites = async () => {
            if (notification && notification.length > 0) {
                const fetchedInvites = await Promise.all(
                    notification.map(async (invite) => {
                        const res = (await getInvitebyId(invite.inviteId)).invite;
                        return res;
                    })
                );
                setInvites(fetchedInvites as inviteType[]);
            }
        };
        fetchInvites();
    }, [notification]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button 
                ref={buttonRef}
                className='mt-1 ml-2 transition-transform hover:scale-105'
                onClick={() => setShowPopup(!showPopup)}
            >
                <Image alt='notification' src={'/images/notification.svg'} height={30} width={30} />
            </button>
            {showPopup && (
                <div 
                    ref={popupRef}
                    className={`
                        absolute top-full right-0 mt-2 bg-black text-white p-4 rounded-lg shadow-lg z-50
                        transition-all duration-300 ease-in-out ${poppins.className}
                    `}
                    style={{ 
                        minWidth: '250px',
                        maxWidth: '300px',
                        maxHeight: '400px',
                        overflowY: 'auto'
                    }}
                >
                    <h3 className="font-bold text-lg mb-2">Accepted Proposals</h3>
                    {invites && invites.length > 0 ? (
                        invites.map((invite: inviteType) => (
                            <div 
                                key={invite.id} 
                                className="mb-2 p-4 hover:bg-gray-800 rounded cursor-pointer transition-all duration-200 ease-in-out" 
                                onClick={() => router.push(`/invitations/${invite.id}`)}
                            >
                                <h4 className="font-semibold">{invite.heading}</h4>
                                <p className="text-sm text-gray-300 mt-1">{invite.pitch}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm">No accepted proposals</div>
                    )}
                </div>
            )}
        </div>
    );
}