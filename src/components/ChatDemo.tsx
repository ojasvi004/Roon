import React from 'react';
import { PiCatFill } from 'react-icons/pi';

const ChatDemo = () => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <div className="relative bg-indigo-500/30 rounded-xl p-2 shadow-2xl">
        <div className="bg-[#1e1f22] rounded-lg overflow-hidden border-2 border-zinc-700 shadow-inner">
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e1f22] border-b border-zinc-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="bg-[#2b2d31] rounded-lg px-4 py-2 flex items-center space-x-3 border border-zinc-600">
                <div className="w-4 text-zinc-400">🔒</div>
                <span className="text-sm text-zinc-300">
                  https://roon-chat.vercel.app
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"></div>
              <div className="w-6 h-6 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"></div>
            </div>
          </div>

          <div className="h-96 bg-[#1e1f22] relative">
            <div className="absolute inset-0 flex">
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

              <div className="w-60 bg-[#2b2d31] flex flex-col">
                <div className="px-4 py-3 border-b border-[#1e1f22] shadow-sm">
                  <div className="flex items-center text-white font-semibold text-sm">
                    <PiCatFill className="w-4 h-4 mr-2" />
                    Messages
                  </div>
                  <div className="text-xs text-zinc-300 mt-1">
                    5 conversations
                  </div>
                </div>

                <div className="px-2 py-2">
                  <div className="bg-[#1e1f22] rounded px-2 py-1 flex items-center">
                    <div className="text-zinc-400 text-xs mr-2"></div>
                    <span className="text-zinc-400 text-xs">
                      Search conversations...
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="px-2 space-y-1">
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
                        <div className="text-sm font-medium truncate">Papa</div>
                        <div className="text-xs text-zinc-400 truncate">👍</div>
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

              <div className="flex-1 bg-[#313338] flex flex-col">
                <div className="px-4 py-3 bg-[#313338] border-b border-[#1e1f22] shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    A
                  </div>
                  <div className="text-white font-semibold">Ananya</div>
                  <div className="ml-auto">
                    <div className="text-zinc-400 text-xs">⋮</div>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-hidden">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold">
                      A
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">
                          Ananya
                        </span>
                        <span className="text-zinc-400 text-xs">2:10 PM</span>
                      </div>
                      <div className="text-white text-sm">
                        OMG! I just finished The Stand!!
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#5865f2] text-white px-3 py-2 rounded-2xl max-w-xs">
                      <div className="text-sm">No way! How was it?</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center text-xs font-bold">
                      A
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">
                          Ananya
                        </span>
                        <span className="text-zinc-400 text-xs">2:12 PM</span>
                      </div>
                      <div className="text-white text-sm">
                        It was INCREDIBLE! Thank you so much for recommending it
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-[#5865f2] text-white px-3 py-2 rounded-2xl max-w-xs">
                      <div className="text-sm">
                        I knew you'd love Stephen King! Tell me more!!
                      </div>
                    </div>
                  </div>
                </div>

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

        <div className="h-4 bg-zinc-700 rounded-b-xl mt-2 shadow-inner"></div>
      </div>
    </div>
  );
};

export default ChatDemo;
