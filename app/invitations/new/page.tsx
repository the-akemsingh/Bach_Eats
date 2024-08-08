"use client"

import { useState } from "react"
import { CreateNewInvite } from "@/app/actions/CreateInvite";
import { useRouter } from "next/navigation";
export default function newInvite() {
    const [heading, setHeading] = useState('');
    const [meal, setMeal] = useState('');
    const [note, setNote] = useState('');
    const Router=useRouter();

    async function CreateInvite() {
        try {

            const res = await CreateNewInvite({ heading, meal, note });
            alert(res.message);
            if(res.status===201){
                Router.push("/invitations/all")
            }

        } catch (e) {
            console.log(e)
            return {
                message: "Error occured",
            }
        }

    }

    return (
        <div className=" flex flex-col text-black max-w-60 max-h-52">
            <input type="text" placeholder="heading"  onChange={
                (e) => {
                    setHeading(e.target.value)
                }
            } />
            <input type="text" placeholder="meal" onChange={
                (e) => {
                    setMeal(e.target.value)
                }
            } />
            <input type="text" placeholder="note" onChange={
                (e) => {
                    setNote(e.target.value)
                }
            } />
            <button onClick={CreateInvite} >Create Invite</button>
        </div>
    )
}