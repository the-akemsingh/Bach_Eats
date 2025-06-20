"use client"

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import myacceptedRequests from "@/app/actions/myacceptedRequests";
import { poppins } from "@/app/fonts";
import getInvitebyId from "@/app/actions/getInviteByID";
import { useRouter } from "next/navigation";
import { acceptedInvites, inviteType } from "@/types";
import { Bell } from "lucide-react";

export default function AcceptedInvitesNotification() {
    const session = useSession();
    const userId = session.data?.user.id;
    const router = useRouter();

    const [notification, setNotification] = useState<acceptedInvites[] | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [invites, setInvites] = useState<inviteType[] | null>(null);
    const [notificationCount, setNotificationCount] = useState<number>(0);

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
    }, [userId]);    useEffect(() => {
        const fetchInvites = async () => {
            if (notification && notification.length > 0) {
                const fetchedInvites = await Promise.all(
                    notification.map(async (invite) => {
                        const res = (await getInvitebyId(invite.inviteId)).invite;
                        return res;
                    })
                );
                setInvites(fetchedInvites as inviteType[]);
                setNotificationCount(fetchedInvites.length);
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
    }, []);    return (
        <div className="w-full">            <button 
                ref={buttonRef}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                onClick={() => setShowPopup(!showPopup)}
            >
                <div className="flex items-center space-x-2">
                    <Bell className="w-6 h-6" />
                    <span>Notifications</span>
                </div>
                {notificationCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-rose-100 bg-rose-600 rounded-full">
                        {notificationCount}
                    </span>
                )}
            </button>
            {showPopup && (
                <div 
                    ref={popupRef}
                    className={`
                        absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50
                        transition-all duration-300 ease-in-out ${poppins.className}
                    `}
                    style={{ 
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                >
                    <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="font-bold text-sm text-gray-700">Accepted Proposals</h3>
                    </div>
                    
                    {invites && invites.length > 0 ? (
                        invites.map((invite: inviteType) => (
                            <div 
                                key={invite.id} 
                                className="px-4 py-3 hover:bg-rose-50 cursor-pointer transition-colors duration-200"                                onClick={() => {
                                    setShowPopup(false);
                                    router.push(`/invitations/${invite.id}`);
                                }}
                            >
                                <h4 className="font-semibold text-sm text-gray-700">{invite.heading}</h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{invite.pitch}</p>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">No accepted proposals</div>
                    )}
                </div>
            )}
        </div>
    );
}