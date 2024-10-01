"use client";

import { allValid_Invites } from "@/app/actions/getAll-Invites";
import { merriweather, pacifico, poppins } from "@/app/fonts";
import { useEffect, useState } from "react";
import InvitePopup from "./invite-popup";
import { inviteType } from "@/types";

const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
};

const ValidInvites = () => {
    const [selectedInvite, setSelectedInvite] = useState<inviteType | null>(null);
    const [invites, setInvites] = useState<inviteType[] | null>(null);

    const getValidInvites = async (): Promise<inviteType[]> => {
        try {
            const res = await allValid_Invites();
            if (res.status === 204) {
                return [];
            }
            return res.activeInvites as inviteType[];
        } catch (e) {
            alert("Error Occurred");
            return [];
        }
    };

    useEffect(() => {
        const fetchInvites = async () => {
            const invites = await getValidInvites();
            setInvites(invites);
        };

        fetchInvites();
    }, []);

    function inviteClickHandler(invite: inviteType) {
        setSelectedInvite(invite);
    }

    return (
        <div className="w-full max-w-screen-lg mx-auto relative">
            {invites && invites.length > 0 ? (
                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {invites.map(invite => (
                            <div
                                key={invite.id}
                                className={`flex flex-col p-6 bg-gray-100 shadow-lg rounded-xl transition-transform transform cursor-pointer
                                            ${selectedInvite === invite ? "relative z-20 scale-105" : ""}`}
                                onClick={() => inviteClickHandler(invite)}
                            >
                                <span className={`mb-2 ${merriweather.className} `}>
                                    {formatDate(invite.timeCreated)}
                                </span>
                                <h2 className={`text-2xl mb-2 ${pacifico.className}`}>
                                    {invite.heading}
                                </h2>
                                <p className="text-lg mb-2 text-gray-700">
                                    {invite.pitch.split(" ").slice(0, 8).join(" ") + "..."}
                                </p>
                            </div>
                        ))}
                    </div>
                    {selectedInvite && (
                        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-10"></div>
                    )}
                </div>
            ) : (
                <div className={`text-5xl mt-32 text-gray-500 text-center ${poppins.className}`}>
                    No active invites
                    <div className={`${pacifico.className} text-lg mt-6`}>Guess no one cooked today</div>
                </div>
            )}
            {selectedInvite && (
                <InvitePopup
                    invite={selectedInvite}
                    onClose={() => setSelectedInvite(null)}
                />
            )}
        </div>
    );
};

export default ValidInvites;