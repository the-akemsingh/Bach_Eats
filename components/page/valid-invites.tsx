"use client";

import { allValid_Invites } from "@/app/actions/getAll-Invites";
import { pacifico, poppins } from "@/app/fonts";
import { useEffect, useState } from "react";
import InvitePopup from "./invite-popup";

interface InviteType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: number;
    emptyslots:number;
    host: {
        id: string;
    };
}

const getValidInvites = async (): Promise<InviteType[]> => {
    try {
        const res = await allValid_Invites();
        if (res.status === 204) {
            return [];
        }
        return res.activeInvites as InviteType[];
    } catch (e) {
        alert("Error Occurred");
        return [];
    }
};

export default function ValidInvites() {
    const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);
    const [invites, setInvites] = useState<InviteType[] | null>(null);

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
                        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-10"></div>
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
