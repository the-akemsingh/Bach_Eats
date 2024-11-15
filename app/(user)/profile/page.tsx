"use client";

import { useSession } from "next-auth/react";
import { Poppins } from 'next/font/google';
import { useEffect, useState } from "react";
import UserInvites from "@/app/actions/fetch-userInvites";
import Image from "next/image";
import deleteInvite from "@/app/actions/deleteInvite";
import { useRouter } from "next/navigation";
import { inviteType } from "@/types";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, User, Trash2 } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function UserProfile() {
  const { data: session } = useSession();
  const [invites, setInvites] = useState<inviteType[] | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inviteToDelete, setInviteToDelete] = useState<string | null>(null);
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

  async function fetchUserInvitesAgain() {
    try {
      const res = await UserInvites(userId);
      if (res.invites) {
        setInvites(res.invites);
      }
    } catch (e) {
      console.error("Error fetching invites", e);
    }
  }

  async function inviteDeleteHandler(inviteId: string) {
    try {
      const res = await deleteInvite(inviteId);
      if (res.status === 200) {
        fetchUserInvitesAgain();
        setShowDeleteModal(false);
        toast.success("Invite deleted successfully");
      }
    } catch (e) {
      toast.error("Error deleting invite");
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
    <div className={`flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 pt-24 px-4 ${poppins.className}`}>
      {/* Tab Navigation */}
      <div className="mb-8 flex space-x-4">
        <button
          className={`text-lg font-semibold p-2 rounded-t-lg transition-colors ${
            activeTab === "profile"
              ? "bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400"
              : "bg-pink-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`text-lg font-semibold p-2 rounded-t-lg transition-colors ${
            activeTab === "invites"
              ? "bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400"
              : "bg-pink-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("invites")}
        >
          Posted Invites
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Your Profile</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                <p className="text-lg text-gray-700 dark:text-gray-300">{userName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                <p className="text-lg text-gray-700 dark:text-gray-300">{userEmail}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                {instaUsername ? (
                  <a
                    className="text-lg text-blue-500 hover:underline"
                    href={`https://www.instagram.com/${instaUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{instaUsername}
                  </a>
                ) : (
                  <span className="text-lg text-gray-500 dark:text-gray-400">Not Linked</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "invites" && (
          <motion.div
            key="invites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Your Posted Invites</h2>
            {invites ? (
              invites.length > 0 ? (
                <div className="space-y-4">
                  {invites.map((invite) => (
                    <motion.div
                      key={invite.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div onClick={() => Router.push(`/invitations/${invite.id}`)} className="cursor-pointer">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{invite.heading}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Posted: {formatDate(invite.timeCreated.toISOString())}
                        </p>
                      </div>
                      <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setInviteToDelete(invite.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Invite</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-center text-gray-600 dark:text-gray-400">No Invites Posted</p>
              )
            ) : (
              <p className="text-lg text-center text-gray-600 dark:text-gray-400">Loading invites...</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-4">
                Are you sure you want to delete this invite?
              </h2>
              <div className="flex justify-around">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => inviteToDelete && inviteDeleteHandler(inviteToDelete)}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}