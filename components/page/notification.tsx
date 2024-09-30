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
    const Router = useRouter();

    const [notification, setNotification] = useState<acceptedInvites[] | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false); // Popup toggle
    const [invites, setInvites] = useState<inviteType[] | null>(null); // Invite data

    const popupRef = useRef<HTMLDivElement | null>(null); // For outside click detection

    useEffect(() => {
        async function fetchNotifications() {
            if (!userId) return;
            const res = await myacceptedRequests(userId as string);
            if (res.status == 200) {
                setNotification(res.invites as acceptedInvites[]);
                setShowPopup(true);
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
    }, [notification])


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

    return <>
        <button className='mt-2 ml-2 transition-transform hover:scale-105 ' onClick={() => setShowPopup(!showPopup)}>
            <Image alt='notification' src={'/images/notification.svg'} height={30} width={30} />
        </button>
        {showPopup  && (
            <div
                ref={popupRef}
                className={`absolute top-12 left-0 bg-black text-white p-4 rounded-lg shadow-lg z-50 min-w-max transition-transform transform ${poppins.className}`}
            >
                <h3 className="font-bold text-lg mb-2">Accepted Proposals</h3>
                {invites && invites.length > 0 ? (
                    invites.map((invite: inviteType) => (
                        <div className="mb-2 p-4 hover:scale-95 " onClick={() => Router.push(`/invitations/${invite.id}`)}>
                            <h4 className="font-semibold">Invite: {invite.heading}</h4>
                            <p>Details: {invite.pitch}</p>
                        </div>
                    ))
                ) : <div className="text-sm">No accepted proposals</div>
                }
            </div>
        )}
    </>
}