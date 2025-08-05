'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Card from "./Card"
import { useSession } from "next-auth/react"

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
    <div className="relative pb-10 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover "
          src="/Cozy_Apartment_Night_View_Video.mp4"
        />
        {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div> */}
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 z-10"
      >


        {/* Main Content */}
        <div className="flex flex-col mt-20 items-center text-center">
          <motion.h1
            variants={fadeInUp}
            className={`cal-sans text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight mt-4 `}

          >
            Join people nearby
            <br />
            for a  <span className="text-yellow-600 ms-madi-regular  relative" 
            >
               shared dining experience
              <div
                className="absolute -bottom-2 top-20 left-0 right-0 h-0.5 bg-yellow-600  rounded-full"
              />
            </span>
          </motion.h1>

          {/* Cards Section */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full max-w-7xl py-2"
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
              <div className="relative z-20 mb-2 sm:mb-0" >
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
            className={`text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed cal-sans`}
          >
            Connect with fellow bachelors in your area. Share homemade meals, discover new flavors, and build lasting
            friendships over food.
          </p>

          <div className="mt-5">
            <Link 
              href={!session ? `/signin` : `/invitations/all`} 
              className="text-slide-container bg-gray-800 text-white transition-colors duration-300  hover:bg-rose-600 
                rounded-full block
                w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4
                max-w-[150px] sm:max-w-[200px] md:max-w-[250px]"
            >
              <div className="text-marquee">
                <span className="text-xl sm:text-2xl md:text-3xl cal-sans font-medium">
                  {!session ? `Get Started • Get Started • Get Started •` : `Explore Now • Explore Now • Explore Now •`}
                </span>
              </div>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
