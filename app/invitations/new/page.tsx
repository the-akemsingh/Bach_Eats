"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateNewInvite } from "@/app/actions/CreateInvite";
import { calistoga, pacifico, poppins } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";

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
        <div className="min-h-screen flex flex-col items-center bg-white p-4">
            <div className="relative top-20 sm:top-32 flex flex-col items-center p-6 sm:p-10 shadow-xl rounded-2xl bg-gray-100 w-full max-w-2xl lg:max-w-3xl">
                <h1
                    className={`text-3xl sm:text-5xl font-bold ${poppins.className} mb-4 sm:mb-6 text-center`}
                >
                    Create a Proposal
                </h1>
                <p
                    className={`text-base sm:text-lg text-gray-600 mb-4 sm:mb-8 text-center ${pacifico.className}`}
                >
                    This proposal will be visible to everyone. Make it count!
                </p>
                <p
                    className={`text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center ${poppins.className}`}
                >
                    *validity of the proposal is 3 hours <br />
                    your Instagram will be visible to everyone
                </p>

                <div className="flex flex-col gap-4 sm:gap-6 w-full">
                    <Input
                        value="Heading"
                        type="text"
                        placeholder="Have a name for your invite?"
                        onChange={(e) => setHeading(e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-base sm:text-lg font-semibold text-gray-700">
                            Pitch Your Proposal
                        </label>
                        <textarea
                            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base text-black resize-none focus:outline-blue-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="Explain what this invite is about, make it enticing!"
                            rows={4} // Adjusted height for smaller screens
                            onChange={(e) => setPitch(e.target.value)}
                        />
                    </div>

                    <Input
                        value="Note"
                        type="text"
                        placeholder="Any important notes to mention?"
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <Input
                        value="Slots"
                        type="number"
                        placeholder="How many people do you expect?"
                        onChange={(e) => setSlots(Number(e.target.value))} // Ensures number value
                    />

                    <button
                        onClick={handleCreateInvite}
                        className="mt-4 transition-transform transform bg-red-500 text-white rounded-lg p-3 w-full hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Create Invite
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
