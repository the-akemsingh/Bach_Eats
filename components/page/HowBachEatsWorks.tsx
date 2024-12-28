'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Utensils, Search, UserCheck, User } from 'lucide-react'
import { DMSerifFont, MarkaziFont } from "@/app/fonts"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => (
  <motion.div
    className="flex flex-col items-center justify-start p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="rounded-full bg-gradient-to-r from-rose-400 to-rose-600 p-5 mb-6">
      <Icon className="w-10 h-10 text-white" />
    </div>
    <h3 className={`${DMSerifFont.className} text-2xl font-semibold mb-4 text-gray-800`}>{title}</h3>
    <p className="text-gray-600 text-center leading-relaxed">{description}</p>
  </motion.div>
)

interface Feature {
  title: string
  description: string
  icon: React.ElementType
}

const HowBachEatsWorks: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Create an Invite",
      description: "Craft a unique dining experience by posting an invite. Share your culinary vision, preferred cuisine, and ideal setting.",
      icon: Utensils
    },
    {
      title: "Discover Experiences",
      description: "Explore a world of culinary adventures. Browse through invites and find the perfect dining experience that speaks to you.",
      icon: Search
    },
    {
      title: "Connect with Guests",
      description: "As a host, review and approve guest requests. As a guest, send requests to join meals that pique your interest.",
      icon: UserCheck
    },
    {
      title: "Manage Your Journey",
      description: "Keep track of your culinary social network. View your profile, manage your invites, and relive your shared dining memories.",
      icon: User
    }
  ]

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
    <div className="max-w-full mx-auto px-6 sm:px-10 min-h-screen py-32 bg-gradient-to-b from-[#f5e6e0] via-[#f9dad3] to-[#f5e6e0]">
      <motion.h2 
        className={`${DMSerifFont.className} text-4xl sm:text-5xl font-bold mb-16 text-center text-gray-800`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        How 
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
          {" "}Bach Eats{" "}
        </span>
        Brings People Together
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeInUp}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default HowBachEatsWorks

