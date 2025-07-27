'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PiCatFill } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa';

const LandingPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Chat Securely.';
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg">
        <PiCatFill className="text-3xl text-white" />
        </div>
          <span className="text-3xl font-semibold font-playwrite">Roon</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <Link
          href="/register"
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </nav>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight mt-28">
            Connect Instantly,{' '}
            <span className="bg-gradient-to-r from-pink-200 to-indigo-500 text-transparent bg-clip-text font-playwrite">
              {displayText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience seamless real-time messaging with advanced privacy controls. 
            Keep your conversations secure while staying connected with what matters most.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">

            
            <Link
              href="/register"
              className="px-6 py-3 text-white rounded-full font-medium border-2 border-white-300 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-t-xl border border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-t-xl border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="flex items-center space-x-1 flex-1 max-w-md mx-4">
                <div className="flex items-center px-3 py-1 bg-gray-700 rounded-t-lg text-sm text-gray-300 border-b-2 border-indigo-500">
                  <PiCatFill className="w-4 h-4 mr-2 text-indigo-400" />
                  Roon Chat
                </div>
                <div className="flex items-center px-3 py-1 bg-gray-800 rounded-t-lg text-sm text-gray-500">
                  <div className="w-4 h-4 mr-2 bg-gray-600 rounded-full"></div>
                  New Tab
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>

            <div className="h-96 bg-gradient-to-br from-purple-900/30 via-gray-900 to-indigo-900/30 rounded-b-xl relative overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-16 bg-gray-950 border-r border-gray-800/50 flex flex-col items-center py-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                    <PiCatFill className="text-2xl text-indigo-400" />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl"></div>
                    <div className="w-10 h-10 bg-gray-800 rounded-xl"></div>
                  </div>
                </div>

                <div className="w-80 bg-gray-900/50 border-r border-gray-800/50 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="w-20 h-3 bg-gray-600 rounded mb-1"></div>
                        <div className="w-32 h-2 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="w-24 h-3 bg-gray-600 rounded mb-1"></div>
                        <div className="w-28 h-2 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="w-16 h-3 bg-gray-600 rounded mb-1"></div>
                        <div className="w-36 h-2 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-gray-900/30 flex flex-col">
                  <div className="p-4 border-b border-gray-800/50 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full"></div>
                    <div>
                      <div className="w-20 h-3 bg-gray-600 rounded mb-1"></div>
                      <div className="w-12 h-2 bg-gray-700 rounded"></div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-gray-800 rounded-2xl rounded-tl-sm p-3">
                        <div className="w-32 h-2 bg-gray-600 rounded mb-2"></div>
                        <div className="w-24 h-2 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-xs bg-indigo-600 rounded-2xl rounded-tr-sm p-3">
                        <div className="w-28 h-2 bg-indigo-300 rounded mb-2"></div>
                        <div className="w-20 h-2 bg-indigo-300 rounded"></div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-gray-800 rounded-2xl rounded-tl-sm p-3">
                        <div className="w-36 h-2 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-800/50">
                    <div className="bg-gray-800/50 rounded-xl p-3 flex items-center space-x-3">
                      <div className="flex-1 h-3 bg-gray-700 rounded"></div>
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default LandingPage;
