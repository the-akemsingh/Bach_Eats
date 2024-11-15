"use client"

import { motion } from "framer-motion"
import { inviteWithRequestsType } from "@/types"

export default function ReceivedRequests({ 
  setSelectedInvite, 
  invites 
}: {
  setSelectedInvite: (invite: inviteWithRequestsType) => void,
  invites: inviteWithRequestsType[] | null
}) {
  function inviteClickHandler(invite: inviteWithRequestsType) {
    setSelectedInvite(invite)
  }

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden">
      <div className="h-full overflow-y-auto pr-4 space-y-2 scrollbar-hide">
        {invites && invites.map((invite: inviteWithRequestsType) => (
          <motion.div
            key={invite.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer relative overflow-hidden"
            onClick={() => inviteClickHandler(invite)}
          >
            <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              {invite.reqReceived.length} Request{invite.reqReceived.length !== 1 ? 's' : ''}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{invite.heading}</h3>
            <p className="text-sm text-gray-400">Slots: {invite.slots}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}