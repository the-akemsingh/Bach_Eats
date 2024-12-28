'use client'

import Link from 'next/link'
import { DMSerifFont } from "@/app/fonts"
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f5e6e0] to-[#f9dad3] text-gray-800">
      <hr className='bg-black border-black mx-32' />
      <div className="max-w-6xl mx-auto  px-4 py-36">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm">
              Designed using{' '}
              <Link
                href="https://ui.aceternity.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:underline font-semibold"
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
                className="text-rose-600 hover:underline font-semibold"
              >
                Icons8
              </Link>
              {' '}and{' '}
              <Link
                href="https://iconscout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:underline font-semibold"
              >
                IconScout
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className={`${DMSerifFont.className} text-xl`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
              Bach Eats
            </span>
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            <Link
              href="https://github.com/the-akemsingh/Bach_Eats"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-rose-600 transition-colors"
              aria-label="Bach Eats GitHub Repository"
            >
              <Github size={24} />
            </Link>
            <p className="ml-4 text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Bach Eats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

