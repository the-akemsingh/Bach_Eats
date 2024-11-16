"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock } from 'lucide-react';
import { signup } from "@/app/actions/Signup";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const user = await signup({
            name,
            email,
            password,
            phonenumber,
            gender,
        });
        if (user.status !== 201) {
            toast.error(user.message);
        } else {
            toast.success("Signed up successfully");
            router.push("/signin");
        }
    };

    return (
        <div className="min-h-screen flex">
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
                    className="absolute top-4 left-8 text-6xl text-white font-bold z-10"
                >
                    BE
                </Link>
            </div>

            <div className="flex-1 flex justify-center items-center bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 p-8 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-6"
                >
                    <h1 className="text-4xl font-bold text-white mb-8">Sign Up</h1>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-gray-300 text-sm mb-1 block">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="John Doe"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-300 text-sm mb-1 block">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="you@example.com"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-300 text-sm mb-1 block">Phone Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="9876543210"
                                />
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-gray-300 text-sm mb-1 block">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="text-gray-300 text-sm mb-1 block">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <button
                            onClick={handleSignup}
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-lg py-3 transition-colors flex items-center justify-center"
                        >
                            Sign Up
                        </button>
                    </div>

                    <p className="text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-pink-500 hover:text-pink-400">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
                <Toaster />
            </div>
        </div>
    );
}