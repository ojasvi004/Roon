'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PiCatFill } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa';
import FeaturesSection from './FeaturesSection';

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
      setShowCursor((prev) => !prev);
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
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
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

      <div className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight mt-28">
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

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience seamless real-time messaging with advanced privacy
            controls. Keep your conversations secure while staying connected
            with what matters most.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="px-6 py-3 text-white rounded-full font-medium border-2 border-white-300 transition-colors"
            >
              Get Started ⟶
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Laptop Frame */}
          <div className="relative bg-indigo-500/30 rounded-xl p-2 shadow-2xl">
            {/* Screen */}
            <div className="bg-[#1e1f22] rounded-lg overflow-hidden border-2 border-gray-700 shadow-inner">
              {/* Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1e1f22] border-b border-gray-700">
                {/* Traffic Lights */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-md mx-4">
                  <div className="bg-[#2b2d31] rounded-lg px-4 py-2 flex items-center space-x-3 border border-gray-600">
                    <div className="w-4 text-gray-400">🔒</div>
                    <span className="text-sm text-gray-300">
                      https://roon-chat.vercel.app
                    </span>
                  </div>
                </div>

                {/* Browser Controls */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600 transition-colors"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600 transition-colors"></div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="h-96 bg-[#1e1f22] relative">
                <div className="absolute inset-0 flex">
                  {/* Left Sidebar - Server/Channel Navigation */}
                  <div className="w-16 bg-[#1e1f22] flex flex-col items-center py-3">
                    <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
                      <PiCatFill className="text-xl text-white" />
                    </div>
                    <div className="w-8 h-[2px] bg-[#35373c] rounded-full mb-2"></div>
                    <div className="flex flex-col space-y-2">
                      <div className="w-12 h-12 bg-[#2b2d31] rounded-3xl hover:rounded-xl hover:bg-[#5865f2] transition-all duration-200"></div>
                      <div className="w-12 h-12 bg-[#2b2d31] rounded-3xl hover:rounded-xl hover:bg-[#5865f2] transition-all duration-200"></div>
                    </div>
                  </div>

                  {/* Channel/DM List */}
                  <div className="w-60 bg-[#2b2d31] flex flex-col">
                    {/* Server Header */}
                    <div className="px-4 py-3 border-b border-[#1e1f22] shadow-sm">
                      <div className="flex items-center text-white font-semibold text-sm">
                        <PiCatFill className="w-4 h-4 mr-2" />
                        Messages
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        5 conversations
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-2 py-2">
                      <div className="bg-[#1e1f22] rounded px-2 py-1 flex items-center">
                        <div className="text-gray-400 text-xs mr-2"></div>
                        <span className="text-gray-400 text-xs">
                          Search conversations...
                        </span>
                      </div>
                    </div>

                    {/* DM List */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="px-2 space-y-1">
                        {/* Active Conversation */}
                        <div className="flex items-center px-2 py-2 rounded bg-[#404249] text-white">
                          <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            A
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Ananya
                            </div>
                            <div className="text-xs text-gray-300 truncate">
                              You: I knew you'd love Stephen King{' '}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">2:15 PM</div>
                        </div>

                        {/* Other Conversations */}
                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-gray-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#4ecdc4] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            O
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Ojasvi
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              See you tomorrow!
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">1:45 PM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-gray-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#45b7d1] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            P
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Papa
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              👍
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">12:30 PM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-gray-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#f39c12] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            S
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Sneha
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              Coffee plans?
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">11:20 AM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-gray-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#9b59b6] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            T
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              The Book Club
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              Next read suggestions?
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">10:15 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Chat Area */}
                  <div className="flex-1 bg-[#313338] flex flex-col">
                    {/* Chat Header */}
                    <div className="px-4 py-3 bg-[#313338] border-b border-[#1e1f22] shadow-sm flex items-center">
                      <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        A
                      </div>
                      <div className="text-white font-semibold">Ananya</div>
                      <div className="ml-auto">
                        <div className="text-gray-400 text-xs">⋮</div>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 space-y-4 overflow-hidden">
                      {/* Friend's message */}
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold">
                          A
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-baseline space-x-2 mb-1">
                            <span className="text-white font-medium text-sm">
                              Ananya
                            </span>
                            <span className="text-gray-400 text-xs">
                              2:10 PM
                            </span>
                          </div>
                          <div className="text-white text-sm">
                            OMG! I just finished The Stand!!
                          </div>
                        </div>
                      </div>

                      {/* Your response */}
                      <div className="flex justify-end">
                        <div className="bg-[#5865f2] text-white px-3 py-2 rounded-2xl max-w-xs">
                          <div className="text-sm">No way! How was it?</div>
                        </div>
                      </div>

                      {/* Friend's message */}
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold">
                          A
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-baseline space-x-2 mb-1">
                            <span className="text-white font-medium text-sm">
                              Ananya
                            </span>
                            <span className="text-gray-400 text-xs">
                              2:12 PM
                            </span>
                          </div>
                          <div className="text-white text-sm">
                            It was INCREDIBLE! Thank you so much for
                            recommending it
                          </div>
                        </div>
                      </div>

                      {/* Your message */}
                      <div className="flex justify-end">
                        <div className="bg-[#5865f2] text-white px-3 py-2 rounded-2xl max-w-xs">
                          <div className="text-sm">
                            I knew you'd love Stephen King! Tell me more!!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4">
                      <div className="bg-[#383a40] rounded-lg px-4 py-3 flex items-center">
                        <div className="text-gray-400 mr-3"></div>
                        <div className="flex-1 text-gray-400 text-sm">
                          Message Ananya...
                        </div>
                        <div className="text-gray-400 ml-3">➤</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="h-4 bg-gray-700 rounded-b-xl mt-2 shadow-inner"></div>
          </div>
        </div>

        {/* Features Section */}
        <FeaturesSection />

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default LandingPage;
