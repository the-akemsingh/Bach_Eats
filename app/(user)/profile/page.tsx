"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserInvites from "@/app/actions/fetch-userInvites";
import Image from "next/image";
import deleteInvite from "@/app/actions/deleteInvite";
import { useRouter } from "next/navigation";
import { inviteType } from "@/types";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, User, Trash2 } from 'lucide-react';
import { DMSerifFont, MarkaziFont } from "@/app/fonts";
import Link from "next/link";

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0] p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6"
      >
        <h1 className={`${DMSerifFont.className} text-4xl sm:text-5xl text-gray-800 mb-8 text-center`}>
          Your 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
            {" "}Profile
          </span>
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`${MarkaziFont.className} text-xl font-semibold p-2 rounded-full transition-colors ${
              activeTab === "profile"
                ? "bg-rose-100 text-rose-600"
                : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Info
          </button>
          <button
            className={`${MarkaziFont.className} text-xl font-semibold p-2 rounded-full transition-colors ${
              activeTab === "invites"
                ? "bg-rose-100 text-rose-600"
                : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500"
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
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-rose-500" />
                <p className={`${MarkaziFont.className} text-xl text-gray-700`}>{userName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-rose-500" />
                <p className={`${MarkaziFont.className} text-xl text-gray-700`}>{userEmail}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="w-6 h-6 text-rose-500" />
                {instaUsername ? (
                  <a
                    className={`${MarkaziFont.className} text-xl text-blue-500 hover:underline`}
                    href={`https://www.instagram.com/${instaUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{instaUsername}
                  </a>
                ) : (
                  <span className={`${MarkaziFont.className} text-xl text-gray-500`}>Not Linked</span>
                )}
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
              className="space-y-4"
            >
              {invites ? (
                invites.length > 0 ? (
                  invites.map((invite) => (
                    <motion.div
                      key={invite.id}
                      className="p-4 border border-rose-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href={`/invitations/${invite.id}`}>
                        <h3 className={`${MarkaziFont.className} text-2xl font-semibold text-gray-800 mb-2`}>{invite.heading}</h3>
                        <p className={`${MarkaziFont.className} text-lg text-gray-500`}>
                          Posted: {formatDate(invite.timeCreated.toISOString())}
                        </p>
                      </Link>
                      <button
                        className={`${MarkaziFont.className} mt-4 px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-colors flex items-center space-x-2`}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setInviteToDelete(invite.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Invite</span>
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className={`${MarkaziFont.className} text-xl text-center text-gray-600`}>No Invites Posted</p>
                )
              ) : (
                <p className={`${MarkaziFont.className} text-xl text-center text-gray-600`}>Loading invites...</p>
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
                className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
              >
                <h2 className={`${DMSerifFont.className} text-2xl font-semibold text-gray-800 text-center mb-4`}>
                  Are you sure you want to delete this invite?
                </h2>
                <div className="flex justify-around">
                  <button
                    className={`${MarkaziFont.className} px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors`}
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${MarkaziFont.className} px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-colors`}
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
      </motion.div>
    </div>
  );
}

