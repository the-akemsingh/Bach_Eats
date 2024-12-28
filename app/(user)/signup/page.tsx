'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Phone, Lock } from 'lucide-react'
import { signup } from "@/app/actions/Signup"
import toast, { Toaster } from 'react-hot-toast'
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [gender, setGender] = useState("")
    const [mailSent, setMailSent] = useState(false)
    const router = useRouter()

    const handleSignup = async () => {
        const user = await signup({
            name,
            email,
            password,
            phonenumber,
            gender,
        })
        if (user.status !== 201) {
            toast.error(user.message)
        } else {
            toast.success("Signup successful")
            setMailSent(true)
            setTimeout(() => {
                router.push("/signin")
            }, 3000)
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
        <div className="min-h-screen flex bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]">
            <div className="hidden lg:flex lg:w-1/2 relative">
                <Image
                    src="/images/redflowercentre.jpg"
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    quality={100}
                />
                <Link 
                    href='/' 
                    className={`absolute top-4 left-8 text-6xl font-bold z-10 ${DMSerifFont.className}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                        BE
                    </span>
                </Link>
            </div>

            <div className="flex-1 flex justify-center items-center p-8 lg:p-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="w-full max-w-md space-y-6"
                >
                    <motion.h1 
                        variants={fadeInUp} 
                        className={`${DMSerifFont.className} text-4xl sm:text-5xl text-gray-800 mb-8`}
                    >
                        Join 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                            {" "}BachEats
                        </span>
                    </motion.h1>
                    
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="John Doe"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="you@example.com"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Phone Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="10 digits"
                                />
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="text-gray-600 text-sm mb-1 block">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/50 text-gray-800 rounded-full px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="8-10 characters"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <motion.button
                            onClick={handleSignup}
                            className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full py-3 transition-all hover:from-rose-500 hover:to-rose-700 flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign Up
                        </motion.button>
                    </motion.div>

                    <motion.p variants={fadeInUp} className="text-center text-gray-600">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-rose-500 hover:text-rose-600">
                            Sign In
                        </Link>
                    </motion.p>
                </motion.div>
                {mailSent && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-4 left-4 bg-green-500 text-white p-2 rounded-full"
                    >
                        Verification mail sent
                    </motion.div>
                )}
                <Toaster />
            </div>
        </div>
    )
}

