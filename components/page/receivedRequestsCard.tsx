"use client";

import { inviteWithRequestsType } from "@/types";

export default function ReceivedRequests({ setSelectedInvite, invites }: {
    setSelectedInvite: (invite: inviteWithRequestsType) => void,
    invites: inviteWithRequestsType[] | null
}) {
    

    function inviteClickHandler(invite: inviteWithRequestsType) {
        setSelectedInvite(invite);
    }

    return (
        <div className="col-span-1 flex flex-col mt-40 gap-2 p-6 overflow-y-auto">
            {invites && invites.map((invite: inviteWithRequestsType) => (
                <div
                    key={invite.id}
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