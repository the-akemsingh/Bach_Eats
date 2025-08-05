'use client'

import { useRouter } from "next/navigation"
import { CreateNewInvite } from "@/app/actions/CreateInvite"
import { motion } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from "react-hook-form";



export default function NewInvite() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();


    const handleCreateInvite = async (data: any) => {
        try {
            const res = await CreateNewInvite({ heading: data.heading, pitch: data.pitch, note: data.note, slots: data.slots })
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
        <div className="grid grid-cols-1 md:grid-cols-2 pt-20 bg-white cal-sans font-normal justify-center p-6">
            <div className="justify-center col-span-1 hidden md:block">
                <img src="/images/newInvitePageImage.svg" className="ml-5 " height={500} width={600} alt="" />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="w-full col-span-1 p-4 md:p-10 max-w-2xl space-y-8 relative mx-auto"
            >
                <motion.div variants={fadeInUp} className="text-center cal-sans bg-white ">
                    <h1 className="text-5xl sm:text-6xl font-normal text-black">
                        Create a
                        <span className="text-yellow-600 ms-madi-regular"> Proposal</span>
                    </h1>
                    <p className="text-gray-600 text-lg">Share your dining experience with others</p>
                </motion.div>
                <motion.div variants={fadeInUp} className=" space-y-6">
                    <form action={''} onSubmit={handleSubmit(handleCreateInvite)}>

                        <div className="space-y-2">
                            <label className="text-black text-lg font-normal block">Invite Name</label>
                            <input
                                type="text"
                                placeholder="Give your invite a catchy name"
                                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-yellow-600 text-black text-lg py-3 px-0 focus:outline-none transition-colors"
                                {...register("heading", { required: { value: true, message: "Invite title is required" }, minLength: { value: 3, message: "Invite title must be at least 3 characters long" }, maxLength: { value: 50, message: "Invite title must be at most 50 characters long" } })}
                            />
                            {errors.heading && (
                                <span className="text-red-500 text-sm">
                                    {errors.heading.message as string}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-black text-lg font-normal block">Expected Guests</label>
                            <input
                                type="number"
                                min={1}
                                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-yellow-600 text-black text-lg py-3 px-0 focus:outline-none transition-colors"
                                placeholder="How many people do you expect?"
                                {...register("slots", { required: { value: true, message: "Number of slots is required" }, min: { value: 1, message: "At least one slot is required" } })}
                            />
                            {errors.slots && (
                                <span className="text-red-500 text-sm">
                                    {errors.slots.message as string}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-black text-lg font-normal block">Pitch Your Proposal</label>
                            <textarea
                                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-yellow-600 text-black text-lg py-3 px-0 focus:outline-none transition-colors "
                                placeholder="Describe your dining experience, make it exciting!"
                                {...register("pitch", { required: { value: true, message: "Pitch is required" }, minLength: { value: 10, message: "Pitch must be at least 10 characters long" }, maxLength: { value: 500, message: "Pitch must be at most 500 characters long" } })}
                            />
                            {errors.pitch && (
                                <span className="text-red-500 text-sm">
                                    {errors.pitch.message as string}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-black text-lg font-normal block">Important Notes</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b-2 border-gray-200 focus:border-yellow-600 text-black text-lg py-3 px-0 focus:outline-none transition-colors"
                                placeholder="Any special requirements or notes?"
                            />
                        </div>
                        <motion.div variants={fadeInUp} className="pt-6">
                            <input
                                type="submit"
                                disabled={isSubmitting}
                                value={"Create Proposal"}
                                className="w-full bg-black text-white text-lg py-4 hover:bg-yellow-600 hover:text-black transition-all duration-300 font-normal"
                            >
                            </input>
                        </motion.div>
                    </form>

                </motion.div>


                <motion.div variants={fadeInUp} className="text-center space-y-2 pt-4">
                    <p className="text-gray-600 text-base">
                        This proposal will be visible to everyone. Make it count!
                    </p>
                    <p className="text-gray-600 text-sm">
                        Proposal validity: 3 hours • Your Instagram will be visible to participants
                    </p>
                </motion.div>

                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                        <div className="text-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
            <Toaster />
        </div>
    )
}
