import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className="w-full px-4 md:px-10  backdrop-blur-lg bg-blue-50 shadow-lg border-b border-white/10 z-50 font-poppins">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="transform hover:scale-105 transition-transform duration-300">
          <Image
            alt="Logo"
            src="/new logo.png"
            width={100}
            height={40}
            priority
            className="drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]"
          />
        </Link>

        {/* CTA Button */}
        <Link href="/dashboard">
          <Button
            className="
              relative overflow-hidden px-6 py-2 rounded-full font-semibold text-white text-base
              bg-gradient-to-tr from-blue-600 to-violet-600 shadow-fancy
              hover:from-violet-600 hover:to-blue-600 hover:shadow-fancyHover
              transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-white/10 blur-md opacity-50 animate-pulse" />
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
