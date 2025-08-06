'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="cal-sans footer-rounded border-t bg-black text-white">
      <div className="max-w-6xl mx-auto  px-4 py-36">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p>
            <span className="text-5xl">
              BachEats.
            </span>
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            {/* <Link
              href="https://github.com/the-akemsingh/Bach_Eats"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-rose-600 transition-colors"
              aria-label="Bach Eats GitHub Repository"
            >
              <Github size={24} />
            </Link> */}
            <p className="ml-4 text-lg">
              &copy; {new Date().getFullYear()} BachEats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

