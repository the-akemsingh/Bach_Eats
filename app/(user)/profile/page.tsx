"use client";
import { useSession } from "next-auth/react";
import {  pacifico } from "@/app/fonts";
import { useEffect, useState } from "react";
import UserInvites from "@/app/actions/fetch-userInvites";
import Image from "next/image";
import deleteInvite from "@/app/actions/deleteInvite";
import { useRouter } from "next/navigation";

interface inviteType {
  id: string;
  heading: string;
  pitch: string;
  note: string | null;
  slots: number;
  timeCreated: Date;
  hostId: string;
}

export default function UserProfile() {
  const { data: session } = useSession();
  const [invites, setInvites] = useState<inviteType[] | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const Router = useRouter();
  const userId = session?.user?.id as string;
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const instaUsername = session?.user.instaUsername;

  useEffect(() => {
    async function fetchUserInvites() {
      try {
        const res = await UserInvites(userId);
        if (res.invites) {
          setInvites(res.invites);
        }
      } catch (e) {
        console.error("Error fetching invites", e);
      }
    }

    fetchUserInvites();
  }, [userId]);

  async function inviteDeleteHandler(inviteId: string) {
    const res = await deleteInvite(inviteId);
    if (res.status === 200) {
      alert("Invite Deleted")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  return (

    <div className="flex flex-col items-center mb-10 pt-10 bg-white min-h-screen">
      <div className="mt-16 flex space-x-8">
        <button
          className={`text-lg font-semibold p-2 ${activeTab === "profile"
            ? "text-red-500 border-b-2 border-red-500"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`text-lg font-semibold p-2 ${activeTab === "invites"
            ? "text-red-500 border-b-2 border-red-500"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("invites")}
        >
          Posted Invites
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="relative top-10 flex flex-col items-center p-8 shadow-xl rounded-2xl bg-gray-100 w-full max-w-2xl">
          <p className={`text-xl ${pacifico.className} text-gray-600 mb-6`}>
            Here’s your profile information.
          </p>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="p-4 border-b border-gray-300 flex justify-between w-full">
              <p className="text-lg font-semibold">Name: {userName}</p>
            </div>
            <div className="p-4 border-b border-gray-300 w-full flex justify-between">
              <p className="text-lg font-semibold">Email: {userEmail}</p>
              <p className="text-green-600 text-sm">✅ Verified</p>
            </div>
            {instaUsername ? (
              <div className="p-4 border-b border-gray-300 w-full">
                <p className=" text-lg font-semibold">
                <Image src={'/images/instagramIcon.svg'} height={25} width={25} alt="Instagram" />:{" "}
                  <a
                    className="text-blue-500 "
                    href={`https://www.instagram.com/${instaUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{instaUsername}
                  </a>
                </p>
              </div>
            ) : (
              <div className="p-4 border-b border-gray-300 w-full">
                <p className="text-lg font-semibold flex gap-4 "> <Image src={'/images/instagramIcon.svg'} height={25} width={25} alt="Tea Cup" /> : <span className="text-blue-500 ">Not Linked</span> </p>
              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === "invites" && (
        <div className="relative top-10 flex flex-col items-center p-8 shadow-xl rounded-2xl bg-gray-100 w-full max-w-2xl">
          <div className="flex flex-col gap-4 w-full">
            {invites ? (
              invites.length > 0 ? (
                invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 cursor-pointer"
                  >
                    <div onClick={() => Router.push(`/invitations/${invite.id}`)}>
                      <h3 className="text-xl font-semibold">{invite.heading}</h3>
                      <p className="text-gray-500 text-sm">
                        Posted: {formatDate(invite.timeCreated.toISOString())}
                      </p>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this invite?")) {
                          inviteDeleteHandler(invite.id);
                        }
                      }}
                    >
                      Delete this Invite
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-lg font-semibold p-4">No Invites Posted</div>
              )
            ) : (null)}
          </div>
        </div>
      )}

    </div>
  );
}
