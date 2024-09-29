"use client";

import isReqReceived from "@/app/actions/ReqReceived";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface inviteType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: number;
    timeCreated: Date;
    hostId: string;
    reqReceived: {
        id: string;
        inviteId: string;
        fromId: string;
    }[];
}

export default function ReceivedRequests({ setSelectedInvite, invites }: {
    setSelectedInvite: (invite: inviteType) => void,
    invites: inviteType[] | null
}) {
    

    function inviteClickHandler(invite: inviteType) {
        setSelectedInvite(invite);
    }

    return (
        <div className="col-span-1 flex flex-col mt-40 gap-2 p-6 overflow-y-auto">
            {invites && invites.map((invite: inviteType) => (
                <div
                    className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                    onClick={() => inviteClickHandler(invite)}
                >
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {invite.reqReceived.length}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{invite.heading}</div>
                    <div className="mt-4 text-gray-500">Slots: {invite.slots}</div>
                </div>
            ))}
        </div>
    )
}