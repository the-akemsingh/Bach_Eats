"use client";

import { FaUser } from "react-icons/fa";
import { allValid_Invites } from "@/app/actions/getAll-Invites";
import { calistoga, pacifico, poppins } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";

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

const getValidInvites = async (): Promise<Invite[]> => {
    try {
        const res = await allValid_Invites();
        if (res.status === 204) {
            return [];
        }
        return res.activeInvites as Invite[];
    } catch (e) {
        alert("Error Occurred");
        return [];
    }
};

interface InvitePopupProps {
    invite: Invite;
    onClose: () => void;
}

const InvitePopup = ({ invite, onClose }: InvitePopupProps) => {
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
            </div>
        </div>
    );
};

export default function ValidInvites() {
    const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);
    const [invites, setInvites] = useState<Invite[] | null>(null);

    function inviteClickHandler(inviteId: string) {
        setSelectedInviteId(inviteId);
    }

    useEffect(() => {
        const fetchInvites = async () => {
            const invites = await getValidInvites();
            setInvites(invites);
        };

        fetchInvites();
    }, []);

    return (
        <div className="w-full max-w-screen-lg mx-auto relative">
            {invites && invites.length > 0 ? (
                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {invites.map(invite => (
                            <div
                                key={invite.id}
                                className={`flex flex-col p-6 bg-gray-100 shadow-lg rounded-xl transition-transform transform cursor-pointer
                                            ${selectedInviteId === invite.id ? "relative z-20 scale-105" : ""}`}
                                onClick={() => inviteClickHandler(invite.id)}
                            >
                                <h2 className={`text-2xl mb-2 ${pacifico.className}`}>
                                    {invite.heading}
                                </h2>
                                <p className="text-lg mb-2 text-gray-700">
                                    {invite.pitch.split(" ").slice(0, 8).join(" ") + "..."}
                                </p>
                            </div>
                        ))}
                    </div>
                    {selectedInviteId && (
                        <div className="absolute inset-0 bg-white backdrop-blur-sm z-10"></div>
                    )}
                </div>
            ) : (
                <div className={`text-5xl mt-32 text-gray-500 text-center ${poppins.className} `}>
                    No active invites
                    <div className={`${pacifico.className} text-lg mt-6 `} >Guess no one cooked today</div>
                </div>
            )}

            {selectedInviteId && (
                <InvitePopup
                    invite={invites!.find(invite => invite.id === selectedInviteId)!}
                    onClose={() => setSelectedInviteId(null)}
                />
            )}
        </div>
    );
}
