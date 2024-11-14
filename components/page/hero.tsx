import { CakeIcon, UsersIcon } from "lucide-react";
import { FlipWords } from "../ui/flip-words";
import { jersey_10 } from "@/app/fonts";

export default function Hero() {

        return (
          <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16 text-center">
              <div className={` mt-32 sm:mt-44 px-5 md:left-24 md:mt-44 flex flex-col text-center md:text-left text-4xl sm:text-5xl md:text-6xl font-extrabold`}>
                <FlipWords className="text-red-400" words={["Not in mood to cook today?", "Feeling lonely?", "Out of groceries?", "Or want to share a meal?"]}></FlipWords>
              </div>
              <p className="text-xl mt-24 mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Join now and discover new friendships, enjoy delicious food, and make your days more enjoyable!
              </p>
              <div className="flex justify-center gap-8 mb-16">
                <div className="flex items-center">
                  <UsersIcon className="w-6 h-6 mr-2 text-pink-500" />
                  <span className="text-lg text-gray-700 dark:text-gray-300">Meet new people</span>
                </div>
                <div className="flex items-center">
                  <CakeIcon className="w-6 h-6 mr-2 text-pink-500" />
                  <span className="text-lg text-gray-700 dark:text-gray-300">Share great meals</span>
                </div>
              </div>
            </div>
            <div className="text-center text-2xl p-4">
              <div className={`${jersey_10.className}`}>
                ⁓ DESIGNED BY BACHELORS FOR THE BACHELORS ⁓
              </div>
            </div>
          </div>
        )
}