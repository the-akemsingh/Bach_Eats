"use client"

import isReqReceived from "@/app/actions/ReqReceived";
import { poppins } from "@/app/fonts";
import ActionOnRequest from "@/components/page/actionOnRequest";
import ReceivedRequests from "@/components/page/receivedRequestsCard";
import { inviteWithRequestsType } from "@/types";
import { useSession } from "next-auth/react";
import {  useEffect, useState } from "react";



export default function ReqReceived() {
    const [invites, setInvites] = useState<inviteWithRequestsType[] | null>(null);
    const [selectedInvite, setSelectedInvite] = useState<inviteWithRequestsType | null>(null);

    const session = useSession();
    const userID = session.data?.user.id!;
    
    useEffect(() => {
        async function getInvites() {
            const res = (await isReqReceived(userID)).invites!;
            setInvites(res);
        }
        getInvites();
    }, [userID]);
    
    if (invites?.length === 0) {
        return (
            <div className={`text-5xl pt-52 text-gray-500 text-center ${poppins.className} `}>
                <div>No Requests</div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-3 h-screen">
            <ReceivedRequests setSelectedInvite={setSelectedInvite}  invites={invites} /> 
            <ActionOnRequest selectedInvite={selectedInvite} invites={invites} ></ActionOnRequest>           
        </div>
    );
}