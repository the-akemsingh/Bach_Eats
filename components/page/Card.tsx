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
          ? 'w-full sm:w-[400px] md:w-[450px] lg:w-[500px] scale-100 sm:scale-110 z-20 p-6 sm:p-8 md:p-10' 
          : 'w-full sm:w-[350px] md:w-[400px] lg:w-[450px] scale-100 sm:scale-90 opacity-80 p-4 sm:p-6 md:p-8'
      }`}
    >
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h2 className={`${DMSerifFont.className} ${
          isCenter ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'
        } text-white`}>{heading}</h2>
      </div>
      <div className="mb-4 sm:mb-6 md:mb-8">
        <p className={`${MarkaziFont.className} ${
          isCenter ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl'
        } text-gray-300`}>{description}</p>
      </div>
      <div className="mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-4">
        <div className={`${
          isCenter ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12' : 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10'
        } rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center`}>
          <span className={`text-white ${
            isCenter ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'
          } font-medium`}>{slots}</span>
        </div>
        <p className={`${MarkaziFont.className} ${
          isCenter ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl'
        } text-gray-300`}>Slots Available</p>
      </div>
      {note && (
        <div className={`mt-4 sm:mt-6 md:mt-8 bg-gray-800 ${
          isCenter ? 'p-4 sm:p-5 md:p-6' : 'p-3 sm:p-4 md:p-5'
        } rounded-xl`}>
          <p className={`${MarkaziFont.className} ${
            isCenter ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'
          } text-gray-300`}>Note: {note}</p>
        </div>
      )}
    </motion.div>
  )
}

export default Card
