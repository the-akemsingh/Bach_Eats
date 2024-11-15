"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from 'next/font/google';
import { User, Users, Instagram, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import getInvitebyId from "@/app/actions/getInviteByID";
import getUserByID from "@/app/actions/getUserbyID";
import sendInviteReq from "@/app/actions/sendInviteReq";
import getGuestList from "@/app/actions/getGuestList";
import deleteGuest from "@/app/actions/deleteGuest";
import isUserReqAccepted from "@/app/actions/isUserReqAccepted";

import { inviteType, userType } from "@/types";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

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
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [host, setHost] = useState<userType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [guests, setGuests] = useState<userType[] | null>(null);
  const [isUserAccepted, setIsUserAccepted] = useState<boolean>(false);

  useEffect(() => {
    async function getInvite() {
      const res = await getInvitebyId(id);
      setInvite(res.invite as inviteType);
    }
    getInvite();
  }, [id]);

  useEffect(() => {
    async function getHost() {
      if (invite?.hostId) {
        const res = await getUserByID(invite.hostId);
        setHost(res.user as userType);
      }
    }
    getHost();
  }, [invite]);

  useEffect(() => {
    setIsAdmin(userId === invite?.hostId);
  }, [invite, userId]);

  useEffect(() => {
    async function checkUserReqAccepted() {
      if (userId) {
        const res = await isUserReqAccepted({ inviteId: id, userId });
        setIsUserAccepted(res.status === 201);
      }
    }
    checkUserReqAccepted();
  }, [id, userId]);

  async function sendReqHandler() {
    try {
      if (userId) {
        const res = await sendInviteReq({ inviteId: id, guestId: userId });
        if (res.status === 201) {
          setRequestSent(true);
          setShowPopup(true);
        } else if (res.status === 200) {
          toast("Request already sent");
        }
      }
    } catch (e) {
      toast.error("Error sending request");
    }
  }

  async function fetchGuestList() {
    try {
      const guests = await getGuestList({ inviteId: id });
      if (guests.status === 200 && guests.users!.length > 0) {
        setGuests(guests.users as userType[]);
      }
      else if (guests.status === 200 && guests.users!.length === 0) {
        toast("No guests approved yet");
      }
    } catch (e) {
      toast.error("Error fetching guest list");
    }
  }

  async function DeleteThisGuestHandler({ inviteId, guestId }: { inviteId: string; guestId: string }) {
    try {
      const res = await deleteGuest({ inviteId, guestId });
      if (res.status === 200) {
        await fetchGuestList();
        toast.success("Deleted Successfully");
      }
    } catch (e) {
      toast.error("Error Deleting");
    }
  }

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl text-pink-600 dark:text-pink-400">Invite not found</h1>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 pt-24 px-4 ${poppins.className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {invite.heading}
          </h1>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">{invite.pitch}</p>
          {invite.note && (
            <p className="text-base font-semibold text-gray-600 dark:text-gray-400 mb-4">
              <AlertCircle className="inline-block mr-2" size={18} />
              {invite.note}
            </p>
          )}
          {host && (
            <div className="flex items-center mb-4">
              <Instagram className="text-pink-600 dark:text-pink-400 mr-2" size={20} />
              <a
                className="text-blue-500 hover:underline"
                href={`https://www.instagram.com/${host.instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{host.instagramUsername}
              </a>
            </div>
          )}
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <Users className="text-gray-600 dark:text-gray-400 mr-2" size={20} />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                Slots: {invite.slots}
              </span>
            </div>
            <div className="flex items-center">
              <User className="text-gray-600 dark:text-gray-400 mr-2" size={20} />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                Empty Slots: {invite.emptyslots}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-6">
          {!isAdmin ? (
            <div className="flex flex-col items-center">
              {isUserAccepted ? (
                <div className="text-center">
                  <span className="text-green-500 text-xl mb-4 block">Request Accepted</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      confirm("Are you sure you want to cancel your request?") &&
                      DeleteThisGuestHandler({ inviteId: invite.id, guestId: userId! })
                    }
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel Request
                  </motion.button>
                </div>
              ) : (
                <div className="text-center">
                  {invite.slots >= invite.emptyslots && invite.emptyslots > 0 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendReqHandler}
                      className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      {!requestSent ? "Send Request" : "Request Sent"}
                    </motion.button>
                  ) : (
                    <span className="text-red-500 text-xl">No Slots Available</span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchGuestList}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                View Approved Guest List
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {guests && guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Approved Guest List</h2>
              <div className="space-y-6">
                {guests.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <User className="text-gray-600 dark:text-gray-400 mr-2" size={18} />
                        <span className="text-lg text-gray-800 dark:text-white">{guest.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Instagram className="text-pink-600 dark:text-pink-400 mr-2" size={18} />
                        <a
                          className="text-blue-500 hover:underline"
                          href={`https://www.instagram.com/${guest.instagramUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @{guest.instagramUsername}
                        </a>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        confirm("Are you sure you want to delete this guest?") &&
                        DeleteThisGuestHandler({ inviteId: invite.id, guestId: guest.id! })
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete Guest
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Request Sent</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Your social account will be visible to the host now.</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">You will be notified when the request is accepted.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}