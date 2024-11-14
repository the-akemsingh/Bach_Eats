"use client"

import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export default function Footer() {
  return (
    <footer className={`${poppins.className} bg-gradient-to-r from-pink-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm">
              Designed using{' '}
              <Link
                href="https://ui.aceternity.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
              >
                Aceternity UI
              </Link>
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm">
              Icons by{' '}
              <Link
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
              >
                Icons8
              </Link>
              {' '}and{' '}
              <Link
                href="https://iconscout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
              >
                IconScout
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bach Eats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}