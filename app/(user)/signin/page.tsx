'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { DMSerifFont } from "@/app/fonts"
import PasswordInput from "@/components/ui/passwordInput"

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSignIn = async () => {
        const user = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        if (user?.error) {
            toast.error(user.error)
            return
        }
        toast.success("Signed in successfully")
        router.push("/")
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
                        Welcome to 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                            {" "}BachEats
                        </span>
                    </motion.h1>
                    
                    <motion.div variants={fadeInUp} className="space-y-4">
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

                        <PasswordInput onChange={setPassword} placeholder="••••••••" type="password" value={password} ></PasswordInput>

                        <motion.button
                            onClick={handleSignIn}
                            className="w-full bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full py-3 transition-all hover:from-rose-500 hover:to-rose-700 flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign In
                        </motion.button>
                    </motion.div>

                    <motion.p variants={fadeInUp} className="text-center text-gray-600">
                        Don&#39;t have an account?{" "}
                        <Link href="/signup" className="text-rose-500 hover:text-rose-600">
                            Sign Up
                        </Link>
                    </motion.p>
                </motion.div>
                <Toaster />
            </div>
        </div>
    )
}

