'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Phone, Lock, Check, ArrowRight } from 'lucide-react'
import { signup } from "@/app/actions/Signup"
import toast, { Toaster } from 'react-hot-toast'
import { DMSerifFont, MarkaziFont } from "@/app/fonts"
import PasswordInput from "@/components/ui/passwordInput"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [gender, setGender] = useState("")
    const [mailSent, setMailSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async () => {
        setIsLoading(true)
        const user = await signup({
            name,
            email,
            password,
            phonenumber,
            gender,
        })
        setIsLoading(false)
        
        if (user.status !== 201) {
            toast.error(user.message)
        } else {
            toast.success("Account created successfully!")
            setMailSent(true)
            setTimeout(() => {
                router.push("/signin")
            }, 3000)
        }
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
                staggerChildren: 0.12
            }
        }
    }

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            {/* Left Side - Image Section */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                {/* Image Container with proper constraints */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl border border-emerald-200/50">
                    <Image
                        src="/images/redflowercentre.jpg"
                        alt="Fresh ingredients and cooking"
                        fill
                        style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        priority
                        quality={95}
                        className="transition-transform duration-700 hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent" />
                </div>
                
                {/* Logo */}
                <Link 
                    href='/' 
                    className={`absolute top-8 left-8 text-6xl font-bold z-20 transition-transform hover:scale-105 ${DMSerifFont.className}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600 drop-shadow-lg">
                        BE
                    </span>
                </Link>

                {/* Welcome card */}
                <div className="absolute bottom-8 left-8 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-sm">
                        <h3 className={`text-2xl text-emerald-700 mb-2 ${DMSerifFont.className}`}>Start Your Journey</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Join thousands of food lovers discovering amazing recipes and culinary adventures.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Form Section */}
            <div className="flex-1 flex justify-center items-center p-6 lg:p-16 relative overflow-y-auto">
                {/* Mobile Logo */}
                <Link 
                    href='/' 
                    className={`lg:hidden absolute top-6 left-6 text-4xl font-bold z-10 ${DMSerifFont.className}`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
                        BE
                    </span>
                </Link>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="w-full max-w-md space-y-8 my-8"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center lg:text-left">
                        <h1 className={`${DMSerifFont.className} text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-4 leading-tight`}>
                            Join 
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
                                {" "}BachEats
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg">Create your account and start cooking amazing meals</p>
                    </motion.div>
                    
                    {/* Form */}
                    <motion.div variants={fadeInUp} className="space-y-5">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 pl-12 
                                             focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white
                                             border border-emerald-100 transition-all duration-300
                                             hover:border-emerald-200 hover:bg-white/90
                                             placeholder:text-gray-400"
                                    placeholder="Enter your full name"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 pl-12 
                                             focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white
                                             border border-emerald-100 transition-all duration-300
                                             hover:border-emerald-200 hover:bg-white/90
                                             placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Phone Number</label>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 pl-12 
                                             focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white
                                             border border-emerald-100 transition-all duration-300
                                             hover:border-emerald-200 hover:bg-white/90
                                             placeholder:text-gray-400"
                                    placeholder="Enter 10-digit phone number"
                                />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Gender Select */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Gender</label>
                            <div className="relative">
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 pl-4
                                             focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white
                                             border border-emerald-100 transition-all duration-300
                                             hover:border-emerald-200 hover:bg-white/90
                                             appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="text-gray-400">Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-gray-700 text-sm font-medium block">Password</label>
                            <PasswordInput 
                                onChange={setPassword} 
                                placeholder="Create a strong password (8-10 characters)" 
                                type="password" 
                                value={password}
                                className="w-full bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl px-4 py-4 
                                         focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white
                                         border border-emerald-100 transition-all duration-300
                                         hover:border-emerald-200 hover:bg-white/90
                                         placeholder:text-gray-400"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <motion.button
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl py-4 px-6
                                     transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 
                                     flex items-center justify-center font-semibold text-lg
                                     shadow-lg hover:shadow-xl hover:shadow-emerald-200/50
                                     focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                                     disabled:opacity-70 disabled:cursor-not-allowed"
                            whileHover={!isLoading ? { scale: 1.03, y: -2 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span>Create Account</span>
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Sign In Link */}
                    <motion.div variants={fadeInUp} className="text-center pt-6 border-t border-emerald-100">
                        <p className="text-gray-600 mb-2">Already have an account?</p>
                        <Link 
                            href="/signin" 
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl 
                                     bg-white/60 backdrop-blur-sm border border-emerald-200 
                                     text-emerald-600 font-semibold hover:bg-white/80 hover:border-emerald-300
                                     transition-all duration-300 hover:scale-105"
                        >
                            Sign In Instead
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Success Message */}
                {mailSent && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 
                                 text-white p-6 rounded-2xl shadow-2xl max-w-sm z-50"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="bg-white/20 rounded-full p-2 mt-1">
                                <Check size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Account Created!</h4>
                                <p className="text-emerald-100 text-sm leading-relaxed">
                                    Verification email sent. Redirecting to sign in...
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

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
                                primary: '#10b981',
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