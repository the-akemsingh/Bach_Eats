"use client"
import AcceptInvite from "@/app/actions/acceptInvite";
import getUserByID from "@/app/actions/getUserbyID";
import isReqReceived from "@/app/actions/ReqReceived";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface inviteType {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: string;
    timeCreated: Date;
    hostId: string;
    reqReceived: {
        id: string;
        inviteId: string;
        fromId: string;
    }[];
}
interface requesterType {
    id: string;
    name: string;
    phonenumber: string;
    gender: string;
    instagramUsername: string | null;
}


export default function ReqReceived() {
    const [invites, setInvites] = useState<inviteType[] | null>(null);
    const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);
    const [requesters, setRequesters] = useState<requesterType[] | null>(null);

    const session = useSession();
    const userID = session.data?.user.id!;

    useEffect(() => {
        async function getInvites() {
            const res = (await isReqReceived(userID)).invites!;
            setInvites(res);
        }
        getInvites();
    }, [userID]);

    useEffect(() => {
        async function getRequesterDetails() {
            if (selectedInviteId) {
                const selectedInvite = invites?.find(invite => invite.id === selectedInviteId);
                if (selectedInvite) {
                    const requesterData = await Promise.all(
                        selectedInvite.reqReceived.map(async (request) => {
                            return (await getUserByID(request.fromId)).user!;
                        })
                    );
                    setRequesters(requesterData);
                }
            }
        }
        getRequesterDetails();
    }, [selectedInviteId, invites]);

    function inviteClickHandler(inviteId: string) {
        setSelectedInviteId(inviteId);
    }

    async function acceptInvite(requester:string,inviteId:string){
        const res=await AcceptInvite({requester,inviteId});
        if(res?.status==201){
            alert("invite accepted")
        }
        if(res?.status==500){
            alert("Error occured")
        }
    }

    if (invites?.length === 0) {
        return (
            <div className="flex justify-center">
                <div>No Requests</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 h-screen">
            <div className="col-span-1 flex flex-col mt-40 gap-2 p-6 overflow-y-auto">
                {invites && invites.map((invite: inviteType) => (
                    <div
                        className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col hover:bg-red-200 transition-colors duration-300 cursor-pointer"
                        onClick={() => inviteClickHandler(invite.id)}
                    >
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {invite.reqReceived.length}
                        </div>
                        <div className="text-lg font-bold text-gray-900">{invite.heading}</div>
                        <div className="mt-4 text-gray-500">Slots: {invite.slots}</div>
                    </div>
                ))}
            </div>

            <div className="col-span-2 mt-40 ml-10">
                {selectedInviteId && requesters && requesters.length > 0 && (
                    <div>
                        {requesters.map((requester: requesterType) => (
                            <div  className="bg-gray-100 p-4 mb-2 rounded-lg shadow">
                                <div className="font-bold">{requester.name}</div>
                                <div>Gender: {requester.gender}</div>
                                <div>Instagram: {requester.instagramUsername || "N/A"}</div>
                                <button className='transition-transform transform text-lg border rounded-2xl pt-1 pb-2 pl-4 pr-4 hover:scale-105 hover:text-red-400 hover:border-red-300 mt-5 ml-3' onClick={()=>acceptInvite(requester.id,selectedInviteId)} >Accept</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
