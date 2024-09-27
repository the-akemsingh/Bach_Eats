"use client"
import getInvitebyId from "@/app/actions/getInviteByID";
import sendInviteReq from "@/app/actions/sendInviteReq";
import { calistoga } from "@/app/fonts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

interface InviteDetailsProps {
    params: {
        id: string;
    };
}
interface invite {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: string;
    emptyslots: string | null;
    timeCreated: Date;
    hostId: string;
}

export default async function InviteDetails({ params }: InviteDetailsProps) {
    const { id } = params;
    const session = useSession();
    const userId = session.data?.user.id
    const [invite, setInvite] = useState<invite | null>(null);
    const [requestsent, setRequestsent] = useState<boolean>(false);

    useEffect(() => {
        async function getInvite() {
            const res = await getInvitebyId(id);
            setInvite(res.invite as invite);
        }
        getInvite();
    }, [id])


    async function sendReqHandler() {
        try {
            if (!requestsent) {
                const res = await sendInviteReq({ inviteId: id, guestId: userId! });
                if (res.status === 201) {
                    setRequestsent(true);
                }
            }
            alert("request already sent")
        } catch (e) {
            alert("Error occurred while sending request");
        }
    }

    if (!invite) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl text-red-500">Invite not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <div className="flex flex-col gap-6 items-center justify-center w-full px-4 mt-36">
                <h1 className={`text-5xl ${calistoga.className} mb-6 text-center`}>
                    {invite.heading}
                </h1>
                <div className="w-full max-w-screen-lg mx-auto">
                    <div className="flex flex-col p-6 mb-4 bg-gray-100 shadow-lg rounded-xl">
                        <p className="text-lg mb-4 text-gray-700">
                            {invite.pitch}
                        </p>
                        {invite.note && (
                            <p className="text-base font-semibold text-gray-600">
                                *{invite.note}
                            </p>
                        )}
                        <div className="flex justify-between mt-4">
                            <div className="flex items-center">
                                <FaUser className="text-black mr-2" />
                                <span className="text-lg text-gray-600">
                                    Slots: {invite.slots}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaUser className="text-black mr-2" />
                                <span className="text-lg text-gray-600">
                                    Empty Slots: {invite.emptyslots}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mt-8">
                        {(Number(invite.slots) >= Number(invite.emptyslots) && Number(invite.emptyslots) > 0) ? (
                            <button
                                onClick={() => sendReqHandler()}
                                className="transition-transform transform text-xl border rounded-2xl pt-2 pb-2 pl-6 pr-6 hover:scale-95 hover:text-red-400 hover:border-red-300"
                            >
                                {!requestsent ? "Send Request" : "Request Sent"}

                            </button>
                        ) : (
                            <span className="text-red-500 text-xl">No Slots Available</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
