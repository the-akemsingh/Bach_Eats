"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X, Users, AlertCircle } from 'lucide-react'
import { inviteType } from "@/types"

interface InvitePopupProps {
  invite: inviteType
  onClose: () => void
}

export default function InvitePopup({ invite, onClose }: InvitePopupProps) {
  const router = useRouter()
  const popupRef = useRef<HTMLDivElement | null>(null)

  async function sendInviteHandler(selectedInviteId: string) {
    router.push(`/invitations/${selectedInviteId}`)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white pr-8">{invite.heading}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Users className="w-4 h-4 mr-1" />
            Expecting guests: {invite.slots} | Slots Empty: {invite.emptyslots}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{invite.pitch}</p>
          {invite.note && (
            <p className="flex items-start text-sm text-gray-600 dark:text-gray-400 mb-6">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              {invite.note}
            </p>
          )}
          <div>
            {Number(invite.slots) >= Number(invite.emptyslots) && Number(invite.emptyslots) > 0 ? (
              <button
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                onClick={() => sendInviteHandler(invite.id)}
              >
                Contact
              </button>
            ) : (
              <span className="text-red-500 font-semibold">Full</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}