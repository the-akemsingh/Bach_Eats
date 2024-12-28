"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X, Users, AlertCircle } from 'lucide-react'
import { inviteType } from "@/types"
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

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
        className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className={`${DMSerifFont.className} text-3xl font-bold text-gray-800 pr-8`}>{invite.heading}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex items-center text-gray-500 mb-4">
            <Users className="w-5 h-5 mr-2" />
            <span className={`${MarkaziFont.className} text-xl`}>
              Expecting guests: {invite.slots} | Slots Empty: {invite.emptyslots}
            </span>
          </div>
          <p className={`${MarkaziFont.className} text-2xl text-gray-700 mb-6`}>{invite.pitch}</p>
          {invite.note && (
            <p className={`flex items-start ${MarkaziFont.className} text-xl text-gray-600 mb-8`}>
              <AlertCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
              {invite.note}
            </p>
          )}
          <div>
            {Number(invite.slots) >= Number(invite.emptyslots) && Number(invite.emptyslots) > 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${MarkaziFont.className} text-xl px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-colors`}
                onClick={() => sendInviteHandler(invite.id)}
              >
                Contact
              </motion.button>
            ) : (
              <span className={`${MarkaziFont.className} text-2xl text-red-500 font-semibold`}>Full</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

