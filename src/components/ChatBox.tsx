'use client';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Users, Camera } from 'lucide-react';

const ChatBox = ({ chat, currentUser, currentChatId }) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  const router = useRouter();

  const seen =
    lastMessage?.seenBy?.some((member) => member._id === currentUser._id) ||
    false;

  const isActive = chat._id === currentChatId;

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ease-out rounded-xl p-3 mb-1 relative overflow-hidden ${
        isActive
          ? 'bg-indigo-600/15 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-[1.02]'
          : 'hover:bg-gray-800/40 hover:shadow-md hover:shadow-gray-900/20 border border-transparent hover:border-gray-700/30'
      }`}
      onClick={() => router.push(`/chats/${chat._id}`)}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full" />
      )}
      
      <div className="flex gap-3 items-center">
        <div className="relative flex-shrink-0">
          {chat?.isGroup ? (
            <div className="relative">
              <Image
                src={chat?.groupPhoto || '/assets/group.png'}
                alt="group-pfp"
                height={48}
                width={48}
                className={`w-12 h-12 rounded-full object-cover transition-all duration-200 ${
                  isActive 
                    ? 'ring-2 ring-indigo-400/50 shadow-lg shadow-indigo-500/20' 
                    : 'ring-2 ring-gray-600/50 group-hover:ring-gray-500/70'
                }`}
              />
              <div className={`absolute -bottom-1 -right-1 rounded-full p-1 transition-colors ${
                isActive ? 'bg-indigo-600' : 'bg-gray-700 group-hover:bg-gray-600'
              }`}>
                <Users className={`w-3 h-3 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={otherMembers[0]?.profileImage || '/assets/person.jpg'}
                alt="pfp"
                height={48}
                width={48}
                className={`w-12 h-12 rounded-full object-cover transition-all duration-200 ${
                  isActive 
                    ? 'ring-2 ring-indigo-400/50 shadow-lg shadow-indigo-500/20' 
                    : 'ring-2 ring-gray-600/50 group-hover:ring-gray-500/70'
                }`}
              />

            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3
              className={`font-semibold truncate transition-colors ${
                isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
              }`}
            >
              {chat?.isGroup ? chat?.name : otherMembers[0]?.username}
            </h3>

            <span
              className={`text-xs flex-shrink-0 ml-2 font-medium transition-colors ${
                isActive ? 'text-indigo-300' : 'text-gray-400 group-hover:text-gray-300'
              }`}
            >
              {!lastMessage
                ? format(new Date(chat?.createdAt), 'p')
                : format(new Date(chat?.lastMessageAt), 'p')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={`text-sm truncate transition-colors ${
                seen 
                  ? 'text-gray-400 group-hover:text-gray-300' 
                  : 'text-gray-300 font-medium group-hover:text-white'
              }`}
            >
              {!lastMessage ? (
                <span className="text-gray-500 italic group-hover:text-gray-400">
                  Start a conversation
                </span>
              ) : lastMessage?.photo ? (
                <div className="flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  <span>
                    {lastMessage?.sender?._id === currentUser._id
                      ? 'You sent a photo'
                      : 'Received a photo'}
                  </span>
                </div>
              ) : (
                <span className="line-clamp-1">
                  {lastMessage?.sender?._id === currentUser._id && (
                    <span className="text-gray-400">You: </span>
                  )}
                  {lastMessage?.text}
                </span>
              )}
            </div>

            {!seen &&
              lastMessage &&
              lastMessage?.sender?._id !== currentUser._id && (
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 transition-all duration-200 ${
                  isActive ? 'bg-white shadow-lg' : 'bg-indigo-500 group-hover:bg-indigo-400'
                }`}></div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
