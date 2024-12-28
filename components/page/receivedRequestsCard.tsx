import { motion } from "framer-motion"
import { inviteWithRequestsType } from "@/types"
import { Users } from 'lucide-react'
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

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

  if (!invites || invites.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <h2 className={`${DMSerifFont.className} text-4xl text-gray-500`}>No requests yet</h2>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden">
      <div className="h-full overflow-y-auto space-y-4 pr-4 scrollbar-hide">
        {invites.map((invite: inviteWithRequestsType) => (
          <motion.div
            key={invite.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 cursor-pointer relative overflow-hidden"
            onClick={() => inviteClickHandler(invite)}
          >
            <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-400 to-rose-600 text-white px-4 py-2 rounded-full flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span className={`${MarkaziFont.className} text-lg`}>
                {invite.reqReceived.length} Request{invite.reqReceived.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <h3 className={`${DMSerifFont.className} text-3xl text-gray-800 mb-4 pr-32`}>
              {invite.heading}
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center">
                <span className={`${MarkaziFont.className} text-white text-lg`}>
                  {invite.slots}
                </span>
              </div>
              <p className={`${MarkaziFont.className} text-xl text-gray-600`}>
                Slots Available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}