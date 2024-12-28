'use client'

import { DMSerifFont, MarkaziFont } from "@/app/fonts"
import { motion } from "framer-motion"
import Link from "next/link"
import Card from "./Card"
import { useSession } from "next-auth/react"
import Navbar from "./navbar"

export default function Hero() {
  const session = useSession().data?.user;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0] relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        {/* Navigation */}
        {session ? (
          <div className=" mb-10">
            <Navbar></Navbar>
          </div>
        ) :
          <>
            <motion.div
              variants={fadeInUp}
              className="flex justify-between items-center mb-12"
            >
              <h1 className={`${DMSerifFont.className} text-5xl sm:text-6xl text-gray-800`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                  BachEats
                </span>
              </h1>
              <div className="space-x-4">
                <Link href="/signup" className="px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm">
                  Sign up
                </Link>
                <Link href="/signin" className="px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm">
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        }



        {/* Main Content */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h1
            variants={fadeInUp}
            className={`${DMSerifFont.className} text-4xl sm:text-5xl md:text-6xl text-gray-800 leading-tight mb-8`}
          >
            Join people nearby
            <br />
            for a shared dining experience
          </motion.h1>

          {/* Cards Section */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full max-w-7xl py-7"
          >
            <div className="flex justify-center items-center gap-4 h-[500px]">
              <div className="absolute left-1/2 transform -translate-x-[100%]  hover:z-10 transition-all duration-300">
                <Card
                  heading="Chirag's special curry"
                  description="We got your lunch covered"
                  note="Feel free to bring your pets"
                  slots={4}
                />
              </div>
              <div className="relative z-20" >
                <Card
                  heading={`Akem's special - ${`"lovely"`}`}
                  description="You are lucky, I am sharing my secret recipe"
                  note="Bring your own drinks"
                  slots={2}
                  isCenter={true}
                />
              </div>
              <div className="absolute left-1/2 transform translate-x-[10%]   hover:z-10 transition-all duration-300">
                <Card
                  heading="Share Stories"
                  description="Connect through food"
                  note="Create memories"
                  slots={2}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}