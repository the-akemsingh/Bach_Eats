"use client";
import getInvitebyId from "@/app/actions/getInviteByID";
import getUserByID from "@/app/actions/getUserbyID";
import sendInviteReq from "@/app/actions/sendInviteReq";
import { calistoga } from "@/app/fonts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import getGuestList from "@/app/actions/getGuestList";
import deleteGuest from "@/app/actions/deleteGuest";
import { inviteType, userType } from "@/types";


interface InviteDetailsProps {
    params: {
        id: string;
    };
}




export default function InviteDetails({ params }: InviteDetailsProps) {
    const { id } = params;
    const session = useSession();
    const userId = session.data?.user.id;
    const [invite, setInvite] = useState<inviteType | null>(null);
    const [requestsent, setRequestsent] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [host, setHost] = useState<userType | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [guests, setGuests] = useState<userType[] | null>(null);




    useEffect(() => {
        async function getInvite() {
            const res = await getInvitebyId(id);
            setInvite(res.invite as inviteType);
        }
        getInvite();
    }, [id]);

    useEffect(() => {
        async function getHost() {
            const res = await getUserByID(invite?.hostId as string);
            setHost(res.user as userType);
        }
        getHost();
    }, [invite]);

    useEffect(() => {
        async function checkAdmin() {
            if (userId === invite?.hostId) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
        checkAdmin();
    }, [invite, userId]);


    async function sendReqHandler() {
        try {
            const res = await sendInviteReq({ inviteId: id, guestId: userId! });
            if (res.status === 201) {
                setRequestsent(true);
                setShowPopup(true);
            }
            if (res.status === 200) {
                alert("Request already sent");
            }
        } catch (e) {
            alert("Error occurred while sending request");
        }
    }

    async function fetchGuestList() {
        try {
            const guests = await getGuestList({ inviteId: id });
            if (guests.status === 200) {
                setGuests(guests.users as userType[]);
            }
        }
        catch (e) {
            alert("Error occurred while fetching guest list");
        }
    }

    function closePopup() {
        setShowPopup(false);
    }

    async function DeleteThisGuestHandler({ inviteId, guestId }: { inviteId: string, guestId: string }) {
        try {
            const res = await deleteGuest({ inviteId: inviteId, guestId: guestId });
            alert(JSON.stringify(res));
            if (res.status === 200) {
                await fetchGuestList();
                alert("Guest Deleted Successfully");
            }
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
                        <p className="text-lg mb-4 text-gray-700">{invite.pitch}</p>
                        {invite.note && (
                            <p className="text-base font-semibold text-gray-600">*{invite.note}</p>
                        )}
                        {host && (
                            <>
                                <p className="flex mt-4 mb-4 gap-2">
                                    <Image src={'/images/instagramIcon.svg'} height={25} width={25} alt="Instagram" />
                                    <a
                                        className="text-blue-500 "
                                        href={`https://www.instagram.com/${host.instagramUsername}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @{host.instagramUsername}
                                    </a>
                                </p>
                            </>
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
                        {!isAdmin && (
                            <div>
                                {(invite.slots) >= invite.emptyslots && invite.emptyslots > 0 ? (
                                    <button
                                        onClick={() => sendReqHandler()}
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                                    >
                                        {!requestsent ? "Send Request" : "Request Sent"}
                                    </button>
                                ) : (
                                    <span className="text-red-500 text-xl">No Slots Available</span>
                                )}
                            </div>
                        )}
                        {isAdmin && (
                            <button
                                onClick={() => fetchGuestList()}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                            >
                                Approved Guest List
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {guests && guests.length > 0 ? (
                <div className="w-full mt-11 max-w-screen-lg mx-auto">
                    <div className="flex flex-col p-6 mb-4 bg-gray-100 shadow-lg rounded-xl">
                        <h2 className="text-2xl mb-4">Approved Guest List</h2>
                        <div className="flex flex-col gap-4">
                            {guests.map((guest) => (
                                <div key={guest.id} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-5 pl-1">
                                        <FaUser className="text-black" />
                                        <span className="text-lg text-gray-600">{guest.name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <Image src={'/images/instagramIcon.svg'} height={25} width={25} alt="Instagram" />
                                        <a
                                            className="text-blue-500 "
                                            href={`https://www.instagram.com/${guest.instagramUsername}`}
                                            target="_blank"
                                            rel=""
                                        >
                                            @{guest.instagramUsername}
                                        </a>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() =>
                                                confirm("Are you sure you want to delete this guest?") && DeleteThisGuestHandler({ inviteId: invite.id, guestId: guest.id! })}
                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                                        >
                                            Delete Guest
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}


            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative z-50" style={{ width: 500 }}>
                        <h2 className="text-2xl mb-4">Request Sent.</h2>
                        <p>Your social account will be visible to host now.</p>
                        <p>You will be notified when the request is accepted</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
