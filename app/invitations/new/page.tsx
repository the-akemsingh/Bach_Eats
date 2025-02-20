'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateNewInvite } from "@/app/actions/CreateInvite"
import { motion } from "framer-motion"
import { Heading, MessageSquare, FileText, Users } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

export default function NewInvite() {
    const [heading, setHeading] = useState("")
    const [pitch, setPitch] = useState("")
    const [note, setNote] = useState("")
    const [slots, setSlots] = useState<number>(0)
    const router = useRouter()

    const handleCreateInvite = async () => {
        try {
            const res = await CreateNewInvite({ heading, pitch, note, slots })
            if (res.status === 201) {
                toast.success("Invite created successfully")
                router.push(`/invitations/${res.id}`)
            } else {
                toast.error(res.message)
            }
        } catch (e) {
            toast.error("Error occurred while creating invite")
        }
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0] p-4 mt-16 sm:mt-0">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="w-full mt-6 max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6"
            >
                <motion.h1 
                    variants={fadeInUp} 
                    className={`${DMSerifFont.className} text-4xl sm:text-5xl text-gray-800 mb-8 text-center`}
                >
                    Create a 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                        {" "}Proposal
                    </span>
                </motion.h1>
                
                <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Invite Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="Have a name for your invite?"
                                />
                                <Heading className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Important Notes</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="Any important notes to mention?"
                                />
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Expected Guests</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={slots}
                                    onChange={(e) => setSlots(Number(e.target.value))}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="How many people do you expect?"
                                />
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="relative h-full">
                            <label className="text-gray-600 text-sm mb-1 block">Pitch Your Proposal</label>
                            <div className="relative h-full">
                                <textarea
                                    value={pitch}
                                    onChange={(e) => setPitch(e.target.value)}
                                    className="w-full h-full bg-white/50 text-gray-800 rounded-2xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                                    placeholder="Explain what this invite is about, make it enticing!"
                                    rows={7}
                                />
                                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    onClick={handleCreateInvite}
                    className="w-36 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full py-3 transition-all hover:from-rose-500 hover:to-rose-700 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create Invite
                </motion.button>

                <motion.p variants={fadeInUp} className="text-center text-gray-600">
                    This proposal will be visible to everyone. Make it count!
                </motion.p>
                <motion.p variants={fadeInUp} className="text-center text-gray-500 text-sm">
                    *validity of the proposal is 3 hours<br />
                    your Instagram will be visible to everyone
                </motion.p>
            </motion.div>
            <Toaster />
        </div>
    )
}

