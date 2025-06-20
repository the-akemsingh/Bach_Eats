'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Eye, EyeOff } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { DMSerifFont } from "@/app/fonts"
import PasswordInput from "@/components/ui/passwordInput"

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
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
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const slideInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
            {/* Left Side - Image Section */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                {/* Image Container with proper constraints */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl border border-rose-200/50">
                    <Image
                        src="/images/redflowercentre.jpg"
                        alt="Beautiful flower arrangement"
                        fill
                        style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        priority
                        quality={95}
                        className="transition-transform duration-700 hover:scale-105"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Logo */}
                <Link 
                    href='/' 
                    className={`absolute top-8 left-8 text-6xl font-bold z-20 transition-transform hover:scale-105 ${DMSerifFont.className}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 drop-shadow-lg">
                        BE
                    </span>
                </Link>

                {/* Decorative elements */}
                <div className="absolute bottom-8 left-8 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <p className="text-gray-800 font-medium">Welcome back to</p>
                        <p className={`text-2xl text-rose-600 ${DMSerifFont.className}`}>BachEats</p>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Form Section */}
            <div className="flex-1 flex justify-center items-center p-6 lg:p-16 relative">
                {/* Mobile Logo */}
                <Link 
                    href='/' 
                    className={`lg:hidden absolute top-6 left-6 text-4xl font-bold z-10 ${DMSerifFont.className}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
                        BE
                    </span>
                </Link>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="w-full max-w-md space-y-8"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center lg:text-left">
                        <h1 className={`${DMSerifFont.className} text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-4 leading-tight`}>
                            Welcome to 
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
                                {" "}BachEats
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg">Sign in to continue your culinary journey</p>
                    </motion.div>
                    
                    {/* Form */}
                    <motion.div variants={fadeInUp} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 pl-12 
                                             focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white
                                             border border-rose-100 transition-all duration-300
                                             hover:border-rose-200 hover:bg-white/90
                                             placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Password</label>
                            <PasswordInput 
                                onChange={setPassword} 
                                placeholder="Enter your password" 
                                type="password" 
                                value={password}
                                className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 
                                         focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white
                                         border border-rose-100 transition-all duration-300
                                         hover:border-rose-200 hover:bg-white/90
                                         placeholder:text-gray-400"
                            />
                        </div>

                        {/* Sign In Button */}
                        <motion.button
                            onClick={handleSignIn}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl py-4 px-6
                                     transition-all duration-300 hover:from-rose-600 hover:to-pink-700 
                                     flex items-center justify-center font-semibold text-lg
                                     shadow-lg hover:shadow-xl hover:shadow-rose-200/50
                                     focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign In
                        </motion.button>

                        {/* <motion.div variants={fadeInUp} className="text-center">
                            <Link href="/forgot-password" className="text-rose-500 hover:text-rose-600 text-sm font-medium transition-colors">
                                Forgot your password?
                            </Link>
                        </motion.div> */}
                    </motion.div>

                    {/* Sign Up Link */}
                    <motion.div variants={fadeInUp} className="text-center pt-6 border-t border-rose-100">
                        <p className="text-gray-600 mb-2">New to BachEats?</p>
                        <Link 
                            href="/signup" 
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl 
                                     bg-white/60 backdrop-blur-sm border border-rose-200 
                                     text-rose-600 font-semibold hover:bg-white/80 hover:border-rose-300
                                     transition-all duration-300 hover:scale-105"
                        >
                            Create Account
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Toast Container */}
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'white',
                            color: '#374151',
                            borderRadius: '12px',
                            border: '1px solid #f3f4f6',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#ec4899',
                                secondary: 'white',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: 'white',
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}