"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import isReqReceived from "@/app/actions/ReqReceived"
import ReceivedRequests from "@/components/page/receivedRequestsCard"
import ActionOnRequest from "@/components/page/actionOnRequest"
import { inviteWithRequestsType } from "@/types"
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${DMSerifFont.className} text-5xl font-bold text-gray-800 text-center`}
        >
          No 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
            {" "}Requests
          </span>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0] pt-24 px-4">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${DMSerifFont.className} text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center`}
        >
          Received 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
            {" "}Requests
          </span>
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ReceivedRequests setSelectedInvite={setSelectedInvite} invites={invites} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ActionOnRequest selectedInvite={selectedInvite} invites={invites} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

