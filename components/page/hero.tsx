'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Card from "./Card"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Hero() {
  const session = useSession().data?.user;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    <div className="relative pb-10 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >

        {/* Navigation
        {session ? (
          <div className="mb-10">
            <Navbar></Navbar>
          </div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="flex flex-col relative bottom-14 sm:flex-row justify-end items-center mb-12 space-y-4 sm:space-y-0"
          >
            <div className="space-x-4">
              <Link href="/signup" className="px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm">
                Sign up
              </Link>
              <Link href="/signin" className="px-6 py-2 bg-white rounded-full text-gray-800 font-medium shadow-sm">
                Sign In
              </Link>
              {!loading ? <>
                <button className="mt-3 font-sans pl-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600" onClick={async () => {
                  setLoading(true)
                  const user = await signIn("credentials", {
                    email: "singhakem032@gmail.com",
                    password: "Qwerty@123",
                    redirect: false,
                  })
                  if (user?.error) {
                    toast.error(user.error)
                    setLoading(false)
                    return
                  }
                  toast.success("Signed in successfully")
                  setLoading(false);
                  router.push("/")
                }} >
                  Use demo credentials
                </button>
              </> : <div className="ml-2">
                logging in..
              </div>}

            </div>
          </motion.div>
        )} */}

        {/* Main Content */}
        <div className="flex flex-col mt-10 items-center text-center">
          <motion.h1
            variants={fadeInUp}
            className={`cal-sans text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-gray-800 leading-tight mt-4 mb-5`}
          >
            Join people nearby
            <br />
            for a  <span className="text-yellow-600 relative"> shared dining experience
              <div
                className="absolute -bottom-2 top-20 left-0 right-0 h-0.5 bg-yellow-600  rounded-full"
              />
            </span>
          </motion.h1>

          {/* Cards Section */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full max-w-7xl py-7"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:h-[500px] mt-4 sm:mt-0">
                <div className="hidden sm:block sm:absolute sm:left-1/2 sm:transform sm:-translate-x-[100%] hover:z-10 transition-all duration-300">
                <Card
                  heading="Chirag's special curry"
                  description="We got your lunch covered"
                  note="Feel free to bring your pets"
                  slots={4}
                />
                </div>
              <div className="relative z-20 mb-4 sm:mb-0" >
                <Card
                  heading={`Akem's special - ${`"lovely"`}`}
                  description="You are lucky, I am sharing my secret recipe"
                  note="Bring your own drinks"
                  slots={2}
                  isCenter={true}
                />
              </div>
              <div className="hidden sm:block sm:absolute sm:left-1/2 sm:transform sm:translate-x-[10%] hover:z-10 transition-all duration-300">
                <Card
                  heading="Share Stories"
                  description="Connect through food"
                  note="Create memories"
                  slots={2}
                />
              </div>
            </div>
          </motion.div>

          <p
            className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed cal-sans`}
          >
            Connect with fellow bachelors in your area. Share homemade meals, discover new flavors, and build lasting
            friendships over food.
          </p>

          <div className="mt-14">
            <Link href="/signin" className="text-slide-container bg-gray-800 text-white  transition-colors duration-300 border  hover:bg-rose-600 max-w-64 min-h-20 rounded-full">
              <div className="text-marquee">
                <span className="text-3xl cal-sans font-medium">{!session ? `Get Started • Get Started • Get Started •` : `Explore Now • Explore Now • Explore Now •`}</span>
              </div>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
