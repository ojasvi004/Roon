import React from 'react';
import Link from 'next/link';
import { PiCatFill } from 'react-icons/pi';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg">
          <PiCatFill className="text-3xl text-white" />
        </div>
        <span className="text-3xl font-semibold font-playwrite">Roon</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-md">
        <Link
          href="#features"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Features
        </Link>
        <Link
          href="#footer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Contact
        </Link>
      </div>

      <a
        href="https://github.com/ojasvi004/Roon"
        className="px-6 py-2 text-gray-300 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        ★ Star on GitHub
      </a>
    </nav>
  );
};

export default Navbar;
