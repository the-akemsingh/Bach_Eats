"use client"

import AcceptInvite from "@/app/actions/acceptInvite";
import deleteRequest from "@/app/actions/deleteRequest";
import getUserByID from "@/app/actions/getUserbyID";
import { useEffect, useState } from "react";
import isUserReqAccepted from "@/app/actions/isUserReqAccepted";

interface requesterType {
    id: string;
    name: string;
    phonenumber: string;
    gender: string;
    instagramUsername: string | null;
    isAccepted: boolean;
}
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

export default function ActionOnRequest({ selectedInvite, invites }: { selectedInvite: inviteType | null, invites: inviteType[] | null }) {
    const [requesters, setRequesters] = useState<requesterType[] | null>(null);

    useEffect(() => {
        async function getRequesterDetails() {
            // if (selectedInviteId) {
            //     const selectedInvite = invites?.find(invite => invite.id === selectedInviteId);
            if (selectedInvite) {
                const requesterData = await Promise.all(
                    selectedInvite.reqReceived.map(async (request) => {
                        const user = (await getUserByID(request.fromId)).user!;
                        const res = await isUserReqAccepted({ inviteId: request.inviteId, userId: request.fromId });
                        return {
                            ...user,
                            isAccepted: res.status === 201,
                        }

                    })
                );
                setRequesters(requesterData);
                // }
            }
        }
        getRequesterDetails();
    }, [selectedInvite, invites]);

    async function acceptInvite(requester: string, invite: inviteType) {
        const res = await AcceptInvite({ requesterId: requester, inviteId: invite.id });
        if (res?.status == 201) {
            alert("invite accepted")
        }
        if (res?.status == 400) {
            alert(res.message)
        }
        if (res?.status == 500) {
            alert("Error occured")
        }
    }
    async function refetchRequesters() {
        if (selectedInvite) {
            const requesterData = await Promise.all(
                selectedInvite.reqReceived.map(async (request) => {
                    const user = (await getUserByID(request.fromId)).user!;
                    const res = await isUserReqAccepted({ inviteId: request.inviteId, userId: request.fromId });
                    return {
                        ...user,
                        isAccepted: res.status === 201,
                    };
                })
            );
            setRequesters(requesterData);
        }
    }
    async function deleteInviteRequest(requester: string, invite: inviteType) {
        const res = await deleteRequest({ requesterId: requester, inviteId: invite.id });
        if (res?.status == 200) {
            await refetchRequesters();
            alert("Request deleted")
        }
        if (res?.status == 500) {
            alert("Error occured")
        }
    }

    return <div className="col-span-2 mt-40 ml-10">
        {selectedInvite && requesters && requesters.length > 0 && (
            <div>
                {requesters.map((requester: requesterType) => (
                    <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow">

                        <div className="font-bold">{requester.name}</div>
                        <div>Gender: {requester.gender}</div>
                        <div>Instagram: {requester.instagramUsername || "N/A"}</div>
                        {!requester.isAccepted ? (
                            <div>
                                <button className='transition-transform transform text-lg border rounded-2xl pt-1 pb-2 pl-4 pr-4 hover:scale-105 hover:text-red-400 hover:border-red-300 mt-5 ml-3' onClick={() => acceptInvite(requester.id, selectedInvite)} >Accept</button>
                                <button className='transition-transform transform text-lg border rounded-2xl pt-1 pb-2 pl-4 pr-4 hover:scale-105 hover:text-red-400 hover:border-red-300 mt-5 ml-3' onClick={() => deleteInviteRequest(requester.id, selectedInvite)} >Delete</button>
                            </div>
                        ) : (
                            <div className="text-green-500">Accepted</div>
                        )}


                    </div>
                ))}
            </div>
        )}
    </div>
}