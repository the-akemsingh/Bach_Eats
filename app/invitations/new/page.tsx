"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateNewInvite } from "@/app/actions/CreateInvite";
import { Poppins } from 'next/font/google';
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function NewInvite() {
    const [heading, setHeading] = useState("");
    const [pitch, setPitch] = useState("");
    const [note, setNote] = useState("");
    const [slots, setSlots] = useState<number>(0);
    const Router = useRouter();

    async function handleCreateInvite() {
        try {
            const res = await CreateNewInvite({ heading, pitch, note, slots });
            if (res.status === 201) {
                toast.success("Invite created successfully");
                Router.push(`/invitations/${res.id}`);
            } else {
                toast.error(res.message);
            }
        } catch (e) {
            toast.error("Error occurred while creating invite");
        }
    }

    return (
        <div className={`min-h-screen flex flex-col items-center bg-[#1a1a1a] p-4 pt-24 ${poppins.className}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl p-8 bg-[#1f1f1f] rounded-2xl shadow-xl"
            >
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white">
                    Create a Proposal
                </h1>
                <p className="text-base text-gray-300 mb-6 text-center">
                    This proposal will be visible to everyone. Make it count!
                </p>
                <p className="text-sm text-gray-400 mb-8 text-center">
                    *validity of the proposal is 3 hours <br />
                    your Instagram will be visible to everyone
                </p>

                <div className="space-y-6">
                    <Input
                        value={heading}
                        type="text"
                        placeholder="Have a name for your invite?"
                        onChange={(e) => setHeading(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400"
                    />

                    <div className="space-y-2">
                        <label className="text-base font-semibold text-gray-300">
                            Pitch Your Proposal
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-700 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Explain what this invite is about, make it enticing!"
                            rows={4}
                            value={pitch}
                            onChange={(e) => setPitch(e.target.value)}
                        />
                    </div>

                    <Input
                        value={note}
                        type="text"
                        placeholder="Any important notes to mention?"
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400"
                    />

                    <Input
                        value={slots.toString()}
                        type="number"
                        placeholder="How many people do you expect?"
                        onChange={(e) => setSlots(Number(e.target.value))}
                        className="w-full p-3 border border-gray-700 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateInvite}
                        className="w-full p-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-colors"
                    >
                        Create Invite
                    </motion.button>
                </div>
            </motion.div>
            <Toaster />
        </div>
    );
}