"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users } from 'lucide-react'
import { allValid_Invites } from "@/app/actions/getAll-Invites"
import { inviteType } from "@/types"
import InvitePopup from "./invite-popup"

const formatDate = (dateString: Date) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export default function ValidInvites() {
  const [selectedInvite, setSelectedInvite] = useState<inviteType | null>(null)
  const [invites, setInvites] = useState<inviteType[] | null>(null)

  const getValidInvites = async (): Promise<inviteType[]> => {
    try {
      const res = await allValid_Invites()
      if (res.status === 204) {
        return []
      }
      return res.activeInvites as inviteType[]
    } catch (e) {
      console.error("Error fetching invites:", e)
      return []
    }
  }

  useEffect(() => {
    const fetchInvites = async () => {
      const invites = await getValidInvites()
      setInvites(invites)
    }

    fetchInvites()
  }, [])

  function inviteClickHandler(invite: inviteType) {
    setSelectedInvite(invite)
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto relative">
      {invites && invites.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {invites.map(invite => (
            <motion.div
              key={invite.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedInvite === invite ? "ring-2 ring-pink-500" : ""
                }`}
                onClick={() => inviteClickHandler(invite)}
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{invite.heading}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(invite.timeCreated)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {invite.pitch.split(" ").slice(0, 10).join(" ") + "..."}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {invite.slots - invite.emptyslots} / {invite.slots}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">No active invites</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400">Guess no one cooked today</p>
        </div>
      )}
      <AnimatePresence>
        {selectedInvite && (
          <InvitePopup
            invite={selectedInvite}
            onClose={() => setSelectedInvite(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}