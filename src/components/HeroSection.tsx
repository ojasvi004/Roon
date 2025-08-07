import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  displayText: string;
  showCursor: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  displayText,
  showCursor,
}) => {
  return (
    <div className="relative z-10 text-center max-w-4xl mx-auto mb-8 md:mb-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight mt-16 md:mt-28 px-4 md:px-0">
        Connect Instantly,{' '}
        <span className="bg-gradient-to-r from-pink-200 to-indigo-500 text-transparent bg-clip-text font-playwrite">
          {displayText}
          <span
            className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
          >
            |
          </span>
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
        Experience seamless real-time messaging with advanced privacy controls.
        Keep your conversations secure while staying connected with what matters
        most.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-16 px-4 md:px-0">
        <Link
          href="/register"
          className="px-6 py-3 text-white rounded-full font-medium border-2 border-white-300 transition-colors"
        >
          Get Started ⟶
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
