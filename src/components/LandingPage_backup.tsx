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
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        <a
          href="https://github.com/ojasvi004/Roon"
          className="px-6 py-2 text-zinc-300 font-medium"
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

          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
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
            <div className="bg-[#1e1f22] rounded-lg overflow-hidden border-2 border-zinc-700 shadow-inner">
              {/* Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1e1f22] border-b border-zinc-700">
                {/* Traffic Lights */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-md mx-4">
                  <div className="bg-[#2b2d31] rounded-lg px-4 py-2 flex items-center space-x-3 border border-zinc-600">
                    <div className="w-4 text-zinc-400">🔒</div>
                    <span className="text-sm text-zinc-300">
                      https://roon-chat.vercel.app
                    </span>
                  </div>
                </div>

                {/* Browser Controls */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"></div>
                  <div className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"></div>
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
                      <div className="text-xs text-zinc-300 mt-1">
                        5 conversations
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-2 py-2">
                      <div className="bg-[#1e1f22] rounded px-2 py-1 flex items-center">
                        <div className="text-zinc-400 text-xs mr-2"></div>
                        <span className="text-zinc-400 text-xs">
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
                            <div className="text-xs text-zinc-300 truncate">
                              You: I knew you'd love Stephen King{' '}
                            </div>
                          </div>
                          <div className="text-xs text-zinc-400">2:15 PM</div>
                        </div>

                        {/* Other Conversations */}
                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-zinc-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#4ecdc4] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            O
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Ojasvi
                            </div>
                            <div className="text-xs text-zinc-400 truncate">
                              See you tomorrow!
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500">1:45 PM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-zinc-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#45b7d1] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            P
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Papa
                            </div>
                            <div className="text-xs text-zinc-400 truncate">
                              👍
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500">12:30 PM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-zinc-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#f39c12] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            S
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              Sneha
                            </div>
                            <div className="text-xs text-zinc-400 truncate">
                              Coffee plans?
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500">11:20 AM</div>
                        </div>

                        <div className="flex items-center px-2 py-2 rounded hover:bg-[#35373c] text-zinc-300 hover:text-white transition-colors">
                          <div className="w-8 h-8 bg-[#9b59b6] rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                            T
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              The Book Club
                            </div>
                            <div className="text-xs text-zinc-400 truncate">
                              Next read suggestions?
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500">10:15 AM</div>
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
                        <div className="text-zinc-400 text-xs">⋮</div>
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
                            <span className="text-zinc-400 text-xs">
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
                            <span className="text-zinc-400 text-xs">
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
                        <div className="text-zinc-400 mr-3"></div>
                        <div className="flex-1 text-zinc-400 text-sm">
                          Message Ananya...
                        </div>
                        <div className="text-zinc-400 ml-3">➤</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="h-4 bg-zinc-700 rounded-b-xl mt-2 shadow-inner"></div>
          </div>
        </div>

        {/* Features Section - Creative Asymmetric Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 px-4">
          {/* Floating Title */}
          <div className="relative mb-20">
            <div className="absolute -top-8 left-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 right-20 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
            
            <div className="text-left max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">What makes us different</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Built for{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r font-playwrite from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    real conversations
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400/60 via-purple-400/60 to-pink-400/60 rounded-full"></div>
                </span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Every feature designed with intention. Every interaction crafted for humans.
              </p>
            </div>
          </div>

          {/* Bento-style Asymmetric Grid */}
          <div className="space-y-8">
            {/* First Row - Large + Medium */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Hero Feature - Real-time Messaging */}
              <div className="lg:flex-1 group relative overflow-hidden">
                <div className="absolute -inset-2 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border border-zinc-700/30 rounded-3xl p-10 h-80 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-500">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Real-time Messaging</h3>
                        <div className="text-indigo-400 text-sm font-medium">Powered by Pusher</div>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      Messages appear instantly across all devices. No delays, no refresh needed. 
                      Just pure, real-time conversation.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                    <span>Zero latency</span>
                    <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                    <span>Cross-platform sync</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-80 space-y-8">
                {/* Security */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-zinc-900/70 backdrop-blur-sm border border-zinc-700/40 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Bank-level Security</h4>
                        <p className="text-zinc-400 text-sm">JWT tokens, encrypted sessions, NextAuth protection</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group Chats */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-zinc-900/70 backdrop-blur-sm border border-zinc-700/40 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Smart Groups</h4>
                        <p className="text-zinc-400 text-sm">Custom photos, member management, organized conversations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Unique Media Feature */}
            <div className="relative">
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-zinc-600 to-transparent"></div>
              
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                <div className="lg:w-96">
                  {/* Read Receipts with Visual */}
                  <div className="group relative h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/40 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-blue-500/40 transition-all duration-500">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
                            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">Read Receipts</h4>
                            <div className="text-blue-400 text-sm">Smart delivery tracking</div>
                          </div>
                        </div>
                        <p className="text-zinc-300 mb-6">Know exactly when your messages are delivered and read. Visual indicators that actually make sense.</p>
                      </div>
                      
                      {/* Visual Read Receipt Demo */}
                      <div className="space-y-2">
                        <div className="flex justify-end">
                          <div className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-sm relative">
                            Hey, are we still on for tonight?
                            <div className="absolute -bottom-1 right-2 flex gap-0.5">
                              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-blue-400 text-right">Read 2:30 PM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Sharing - Large Feature */}
                <div className="lg:flex-1 group relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/40 rounded-3xl p-10 hover:border-orange-500/40 transition-all duration-500">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-white">Media That Works</h4>
                            <div className="text-orange-400 text-sm font-medium">Cloudinary-powered uploads</div>
                          </div>
                        </div>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                          Drag, drop, share. Photos and images upload instantly and display beautifully across all conversations.
                        </p>
                        <div className="flex items-center gap-4 text-orange-400 text-sm">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            Instant uploads
                          </span>
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            Auto-optimization
                          </span>
                        </div>
                      </div>
                      
                      {/* Visual Media Preview */}
                      <div className="w-48 h-32 bg-zinc-800/50 rounded-xl border border-zinc-600/50 flex items-center justify-center">
                        <div className="text-zinc-500 text-sm">Image preview</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row - Search + Profile */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:flex-1 space-y-6">
                {/* Search Feature */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/30 to-amber-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-zinc-900/70 backdrop-blur-sm border border-zinc-700/40 rounded-2xl p-8 hover:border-yellow-500/40 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-yellow-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-3">Lightning Search</h4>
                        <p className="text-zinc-300 leading-relaxed">Find any conversation, contact, or message instantly. Advanced filtering that actually understands what you're looking for.</p>
                        
                        {/* Search Demo */}
                        <div className="mt-4 bg-zinc-800/50 rounded-lg p-3 border border-zinc-600/30">
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span className="text-zinc-400">Search: "book club meeting"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Management */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/30 to-pink-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-zinc-900/70 backdrop-blur-sm border border-zinc-700/40 rounded-2xl p-8 hover:border-rose-500/40 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-rose-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-3">Your Digital Identity</h4>
                        <p className="text-zinc-300 leading-relaxed">Customize your profile with photos, display names, and privacy settings. Make every conversation uniquely yours.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cross-Platform - Vertical Feature */}
              <div className="lg:w-80 group relative">
                <div className="absolute -inset-2 bg-gradient-to-b from-teal-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/40 rounded-3xl p-8 h-full flex flex-col justify-center hover:border-teal-500/40 transition-all duration-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Everywhere You Are</h4>
                    <p className="text-zinc-300 leading-relaxed mb-6">Desktop, tablet, mobile. One conversation, perfectly synced across every device you use.</p>
                    
                    {/* Device Icons */}
                    <div className="flex justify-center gap-4">
                      <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-3 bg-teal-400 rounded-sm"></div>
                      </div>
                      <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-4 bg-teal-400 rounded-sm"></div>
                      </div>
                      <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-3 bg-teal-400 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default LandingPage;
