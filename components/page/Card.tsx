'use client'

import { DMSerifFont, MarkaziFont } from "@/app/fonts"
import { motion } from "framer-motion"

interface CardProps {
  heading: string
  description: string
  slots: number
  note?: string
  isCenter?: boolean
}

const Card = ({ heading, description, slots, note, isCenter }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: isCenter ? 1.05 : 1.02, zIndex: 30 }}
      className={`bg-gray-900 shadow-xl rounded-3xl transform transition-all duration-300 ${
        isCenter 
          ? 'w-[500px] scale-110 z-20 p-10' 
          : 'w-[450px] scale-90 opacity-80 p-8'
      }`}
    >
      <div className="mb-8">
        <h2 className={`${DMSerifFont.className} ${
          isCenter ? 'text-4xl' : 'text-3xl'
        } text-white`}>{heading}</h2>
      </div>
      <div className="mb-8">
        <p className={`${MarkaziFont.className} ${
          isCenter ? 'text-2xl' : 'text-xl'
        } text-gray-300`}>{description}</p>
      </div>
      <div className="mb-8 flex items-center gap-4">
        <div className={`${
          isCenter ? 'w-12 h-12' : 'w-10 h-10'
        } rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center`}>
          <span className={`text-white ${
            isCenter ? 'text-xl' : 'text-lg'
          } font-medium`}>{slots}</span>
        </div>
        <p className={`${MarkaziFont.className} ${
          isCenter ? 'text-2xl' : 'text-xl'
        } text-gray-300`}>Slots Available</p>
      </div>
      {note && (
        <div className={`mt-8 bg-gray-800 ${
          isCenter ? 'p-6' : 'p-4'
        } rounded-xl`}>
          <p className={`${MarkaziFont.className} ${
            isCenter ? 'text-xl' : 'text-lg'
          } text-gray-300`}>Note: {note}</p>
        </div>
      )}
    </motion.div>
  )
}

export default Card