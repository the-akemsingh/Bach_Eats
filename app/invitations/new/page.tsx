"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateNewInvite } from "@/app/actions/CreateInvite";
import { calistoga, pacifico, poppins } from "@/app/fonts";
import { Input } from "@/components/ui/input";

export default function NewInvite() {
    const [heading, setHeading] = useState('');
    const [pitch, setPitch] = useState('');
    const [note, setNote] = useState('');
    const [slots, setSlots] = useState<number>(0);
    const Router = useRouter();

    async function handleCreateInvite() {
        try {
            const res = await CreateNewInvite({ heading, pitch, note, slots });
            alert(res.message);
            if (res.status === 201) {
                Router.push("/invitations/all");
            }
        } catch (e) {
            console.log(e);
            alert("Error occurred while creating invite");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <div className="relative top-32 flex flex-col items-center p-10 shadow-xl rounded-2xl bg-gray-100 w-full max-w-3xl">
                <h1 className={`text-5xl ${poppins.className} mb-6`}>Create a Proposal</h1>
                <p className={`text-lg text-gray-600 mb-8 text-center ${pacifico.className}`}>
                    This proposal will be visible to everyone. Make it count!
                </p>
                <p className={`text-lg text-gray-600 mb-8 text-center ${poppins.className}`}>
                    *validity of the proposal is 3 hours <br />
                    your instagram will be visible to the everyone
                </p>
                
                <div className="flex flex-col gap-6 w-full">
                    <Input 
                        value="Heading" 
                        type="text" 
                        placeholder="Have a name for your invite?" 
                        onChange={(e) => setHeading(e.target.value)} 
                    />
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Pitch Your Proposal
                        </label>
                        <textarea 
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-sm text-black resize-none focus:outline-blue-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="Explain what this invite is about, make it enticing!"
                            rows={6} // Sets height of the textarea
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
        </div>
    );
}
