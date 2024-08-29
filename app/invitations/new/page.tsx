"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateNewInvite } from "@/app/actions/CreateInvite";
import { calistoga, pacifico } from "@/app/fonts";
import { Input } from "@/components/ui/input";

export default function NewInvite() {
    const [heading, setHeading] = useState('');
    const [pitch, setPitch] = useState('');
    const [note, setNote] = useState('');
    const [slots, setSlots] = useState('');
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
        <div className="min-h-screen flex flex-col items-center bg-white overflow-hidden">
            <div className="relative top-32 flex flex-col items-start p-8 shadow-xl rounded-2xl bg-gray-100">
                <h1 className={`text-5xl ${calistoga.className} mb-4`}>Creating a  Invite</h1>
                <p className={`text-xl ${pacifico.className} text-gray-600 mb-6`}>
                    Tell us what you have got
                </p>
                <div className="flex flex-col gap-4 w-full">
                    <Input value="Heading" placeholder="Have a name for invite?" onChange={(e) => setHeading(e.target.value)} >
                    </Input>

                    <Input value="Pitch" placeholder="Pitch your invite here" onChange={(e) => setPitch(e.target.value)}>
                    </Input>

                    <Input value="Note" placeholder="Something that one should be aware of" onChange={(e) => setNote(e.target.value)}>
                    </Input>

                    <Input value="Heading" placeholder="How many people do you expect?" onChange={(e) => setSlots(e.target.value)}>
                    </Input>

                    <button
                        onClick={handleCreateInvite}
                        className="mt-4 transition-transform transform bg-red-500 text-white rounded-lg p-3 w-full hover:scale-105 hover:bg-red-700"
                    >
                        Create Invite
                    </button>
                </div>
            </div>

        </div>
    );
}
