import { Poppins } from 'next/font/google'
import ValidInvites from "@/components/page/valid-invites"

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

export default function AllInvites() {
  return (
    <div className={`min-h-screen pt-24 flex flex-col items-center bg-gradient-to-b from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          All Invites
        </h1>
        <ValidInvites />
      </div>
    </div>
  )
}