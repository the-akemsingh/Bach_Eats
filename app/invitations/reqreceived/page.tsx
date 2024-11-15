"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import isReqReceived from "@/app/actions/ReqReceived"
import ReceivedRequests from "@/components/page/receivedRequestsCard"
import ActionOnRequest from "@/components/page/actionOnRequest"
import { inviteWithRequestsType } from "@/types"

export default function ReqReceived() {
  const [invites, setInvites] = useState<inviteWithRequestsType[] | null>(null)
  const [selectedInvite, setSelectedInvite] = useState<inviteWithRequestsType | null>(null)

  const session = useSession()
  const userID = session.data?.user.id!

  useEffect(() => {
    async function getInvites() {
      const res = (await isReqReceived(userID)).invites!
      setInvites(res)
    }
    getInvites()
  }, [userID])

  if (invites?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-600 dark:text-gray-300 text-center"
        >
          No Requests
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Received Requests</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ReceivedRequests setSelectedInvite={setSelectedInvite} invites={invites} />
          <ActionOnRequest selectedInvite={selectedInvite} invites={invites} />
        </div>
      </div>
    </div>
  )
}