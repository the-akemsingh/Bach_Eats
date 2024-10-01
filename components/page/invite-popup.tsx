"use client";

import { FaUser } from "react-icons/fa";
import { calistoga } from "@/app/fonts";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { inviteType } from "@/types";

interface InvitePopupProps {
    invite: inviteType;
    onClose: () => void;
}


export default function InvitePopup({ invite, onClose }: InvitePopupProps) {

    const Router = useRouter();

    async function sendInviteHandler(selectedInviteId: string) {
        Router.push(`/invitations/${selectedInviteId}`)
    }


    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
            <div
                ref={popupRef}
                className="bg-white p-6 rounded shadow-lg min-h-96 relative transition-transform duration-300 ease-in-out transform scale-95 z-50"
                style={{ width: 700 }}
            >
                <h2 className={`text-3xl ${calistoga.className} mb-4 border-b-2 border-gray-300 pb-2`}>
                    {invite.heading}
                </h2>
                <div className="flex items-center mb-2">
                    <FaUser className="text-black mr-2" />
                    <p className="text-lg text-gray-600">
                        Expecting guests: {invite.slots}
                    </p>
                </div>
                <div className="flex items-center mb-2">
                    <FaUser className="text-black mr-2" />
                    <p className="text-lg text-gray-600">
                        Slots Empty: {invite.emptyslots}
                    </p>
                </div>
                <p className="text-lg text-gray-700 mb-2">
                    {invite.pitch}
                </p>
                <p className="text-base font-bold text-gray-600">
                    *{invite.note}
                </p>
                {(Number(invite.slots) >= Number(invite.emptyslots) && Number(invite.emptyslots) > 0) ? (
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                        onClick={() => sendInviteHandler(invite.id)}
                    >
                        Contact
                    </button>
                ) : (
                    <span className="text-red-500 text-xl mt-5 ml-3">Full</span>
                )}
            </div>
        </div>
    );
}