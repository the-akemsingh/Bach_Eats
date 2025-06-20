import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Check, X, Instagram } from 'lucide-react'
import AcceptInvite from "@/app/actions/acceptInvite"
import deleteRequest from "@/app/actions/deleteRequest"
import getUserByID from "@/app/actions/getUserbyID"
import isUserReqAccepted from "@/app/actions/isUserReqAccepted"
import { inviteWithRequestsType, requesterType } from "@/types"
import toast, { Toaster } from 'react-hot-toast'

export default function ActionOnRequest({ 
  selectedInvite, 
  invites 
}: { 
  selectedInvite: inviteWithRequestsType | null, 
  invites: inviteWithRequestsType[] | null 
}) {
  const [requesters, setRequesters] = useState<requesterType[] | null>(null)

  useEffect(() => {
    async function getRequesterDetails() {
      if (selectedInvite) {
        const requesterData = await Promise.all(
          selectedInvite.reqReceived.map(async (request) => {
            const user = (await getUserByID(request.fromId)).user!
            const res = await isUserReqAccepted({ inviteId: request.inviteId, userId: request.fromId })
            const isAccepted = res.status === 201
            return {
              ...user,
              isAccepted,
            }
          })
        )
        setRequesters(requesterData)
      }
    }
    getRequesterDetails()
  }, [selectedInvite, invites])

  async function acceptInvite(requester: string, invite: inviteWithRequestsType) {
    const res = await AcceptInvite({ requesterId: requester, inviteId: invite.id })
    if (res?.status == 201) {
      await refetchRequesters()
      toast.success("Invite accepted")
    } else {
      toast.error("Error occurred")
    }
  }

  async function refetchRequesters() {
    if (selectedInvite) {
      const requesterData = await Promise.all(
        selectedInvite.reqReceived.map(async (request) => {
          const user = (await getUserByID(request.fromId)).user!
          const res = await isUserReqAccepted({ inviteId: request.inviteId, userId: request.fromId })
          return {
            ...user,
            isAccepted: res.status === 201,
          }
        })
      )
      setRequesters(requesterData)
    }
  }

  async function deleteInviteRequest(requester: string, invite: inviteWithRequestsType) {
    const res = await deleteRequest({ requesterId: requester, inviteId: invite.id })
    if (res?.status == 200) {
      toast.success("Request deleted")
      await refetchRequesters()
    }
    if (res?.status == 500) {
      toast.error("Error occurred")
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {selectedInvite && requesters && requesters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              {/* <h2 className={`${DMSerifFont.className} text-4xl text-gray-800 mb-8`}>
                Requests for: {selectedInvite.heading}
              </h2> */}
              <div className="space-y-6">
                {requesters.map((requester: requesterType) => (
                  <div key={requester.id} className="flex flex-col border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <User className="text-gray-600 mr-2" size={24} />
                        <span className={` text-2xl text-gray-800`}>
                          {requester.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Instagram className="text-rose-600 mr-2" size={20} />
                        <a
                          href={`https://www.instagram.com/${requester.instagramUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={` text-xl text-blue-500 hover:underline`}
                        >
                          @{requester.instagramUsername || "N/A"}
                        </a>
                      </div>
                    </div>
                    
                    <div className={` text-xl text-gray-600 mb-4`}>
                      Gender: {requester.gender}
                    </div>
                    
                    {!requester.isAccepted ? (
                      <div className="flex gap-4">
                        <motion.button
                          onClick={() => acceptInvite(requester.id, selectedInvite)}
                          className={` text-xl px-6 py-2 bg-emerald-600 text-white rounded-full flex items-center justify-center transition-colors`}
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Accept Request
                        </motion.button>
                        <motion.button
                          onClick={() => deleteInviteRequest(requester.id, selectedInvite)}
                          className={` text-lg px-6 py-2 bg-rose-600 text-white rounded-full flex items-center justify-center transition-colors`}
                        >
                          <X className="w-5 h-5 mr-2" />
                          Delete Request
                        </motion.button>
                      </div>
                    ) : (
                      <div className={` text-2xl text-emerald-500 font-medium`}>
                        Request Accepted
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  )
}