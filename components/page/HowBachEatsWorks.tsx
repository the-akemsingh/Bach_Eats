'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Utensils, Search, UserCheck, User } from 'lucide-react'
import { Feature } from '../ui/feature-section-with-bento-grid'

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
    <h3 className={`text-2xl font-semibold mb-4 text-gray-800`}>{title}</h3>
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
    <div className="max-w-full cal-sans mx-auto px-6 sm:px-10 min-h-screen">
      {/* <motion.h2
        className={`cal-sans text-4xl sm:text-5xl font-bold mb-16 text-center text-gray-800`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        How{" "}
        <span className="relative inline-block">
          <span className="text-rose-600 relative z-10">Bach Eats</span>
          <svg
            viewBox="0 0 286 73"
            fill="none"
            width={250}
            height={100}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-0"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#FACC15"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        Brings People Together
      </motion.h2> */}

      {/* <motion.div
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
      </motion.div> */}
      <Feature />
    </div>
  )
}

export default HowBachEatsWorks

