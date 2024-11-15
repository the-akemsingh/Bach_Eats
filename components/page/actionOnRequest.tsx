"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Check, X } from 'lucide-react'
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
    <div className="lg:col-span-2">
      <AnimatePresence>
        {selectedInvite && requesters && requesters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Requests for: {selectedInvite.heading}</h2>
            <div className="space-y-4">
              {requesters.map((requester: requesterType) => (
                <div key={requester.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
                    <span className="font-semibold text-gray-800 dark:text-white">{requester.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Gender: {requester.gender}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Instagram: {requester.instagramUsername || "N/A"}
                  </div>
                  {!requester.isAccepted ? (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                        onClick={() => acceptInvite(requester.id, selectedInvite)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                        onClick={() => deleteInviteRequest(requester.id, selectedInvite)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Delete
                      </motion.button>
                    </div>
                  ) : (
                    <div className="text-green-500 font-semibold">Accepted</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  )
}