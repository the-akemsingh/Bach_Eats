"use client";

import { FaUser } from "react-icons/fa";
import { allValid_Invites } from "@/app/actions/getAll-Invites";
import { calistoga, pacifico, poppins } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";
import sendInviteReq from "@/app/actions/sendInviteReq";

interface InvitePopupProps {
    invite: Invite;
    onClose: () => void;
}
interface Invite {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: string;
    host: {
        id: string;
    };
}

const sendInviteHandler = async (selectedInviteId: string, guestId: string) => {
    try {
        const res = await sendInviteReq({ inviteId: selectedInviteId, guestId })
    }
    catch (e) {
        alert("Error occured while sending request")
    }
}


export default function InvitePopup({ invite, onClose }: InvitePopupProps) {
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
                className="bg-white p-6 rounded-xl shadow-lg min-h-96 relative transition-transform duration-300 ease-in-out transform scale-95 z-50"
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
                <p className="text-lg text-gray-700 mb-2">
                    {invite.pitch}
                </p>
                <p className="text-base font-bold text-gray-600">
                    *{invite.note}
                </p>
                <button className='transition-transform transform text-xl border rounded-2xl pt-2 pb-2 pl-6 pr-6 hover:scale-105 hover:text-red-400 hover:border-red-300 mt-5 ml-3 ' onClick={() => { sendInviteHandler }} >
                    Send Request
                </button>
            </div>
        </div>
    );
};