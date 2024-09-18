"use client";
import { useSession } from "next-auth/react";
import { calistoga, pacifico } from "@/app/fonts";
import { useEffect, useState } from "react";
import UserInvites from "@/app/actions/fetch-userInvites";
import Image from "next/image";

export default function UserProfile() {
  const { data: session } = useSession();
  const [invites, setInvites] = useState< {
    id: string;
    heading: string;
    pitch: string;
    note: string | null;
    slots: string;
    timeCreated: Date;
    hostId: string;
}[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedInvite, setExpandedInvite] = useState<string | null>(null);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
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

      {/* Profile Information Section */}
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
                  Instagram:{" "}
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
          <h2 className={`text-3xl ${calistoga.className} mb-4 text-center`}>
            Your Invites
          </h2>
          <div className="flex flex-col gap-4 w-full">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 cursor-pointer"
                onClick={() =>
                  setExpandedInvite(expandedInvite === invite.id ? null : invite.id)
                }
              >
                <h3 className="text-xl font-semibold">{invite.heading}</h3>
                <p className="text-gray-500 text-sm">
                Posted: {formatDate(invite.timeCreated.toISOString())}
                </p>

                {expandedInvite === invite.id && (
                  <div className="mt-4">
                    <p className="text-gray-700">{invite.pitch}</p>
                    {invite.note && (
                      <p className="text-gray-600 italic">{invite.note}</p>
                    )}
                    <p className="text-gray-500">Slots: {invite.slots}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
