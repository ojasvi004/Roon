'use client';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Users, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

  const unreadCount = chat?.messages?.filter(
    (message) => 
      message.sender._id !== currentUser._id && 
      !message.seenBy?.some((member) => member._id === currentUser._id)
  ).length || 0;

  const isActive = chat._id === currentChatId;

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ease-out rounded-xl p-3 mb-1 relative overflow-hidden ${
        isActive
          ? 'bg-indigo-600/15 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-[1.02]'
          : 'hover:bg-zinc-800/40 hover:shadow-md hover:shadow-zinc-900/20 border border-transparent hover:border-zinc-700/30'
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
                    : 'ring-2 ring-zinc-600/50 group-hover:ring-zinc-500/70'
                }`}
              />
              <div className={`absolute -bottom-1 -right-1 rounded-full p-1 transition-colors ${
                isActive ? 'bg-indigo-600' : 'bg-zinc-700 group-hover:bg-zinc-600'
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
                    : 'ring-2 ring-zinc-600/50 group-hover:ring-zinc-500/70'
                }`}
              />

            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3
              className={`font-semibold truncate transition-colors ${
                isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'
              }`}
            >
              {chat?.isGroup ? chat?.name : otherMembers[0]?.username}
            </h3>

            <span
              className={`text-xs flex-shrink-0 ml-2 font-medium transition-colors ${
                isActive ? 'text-indigo-300' : 'text-zinc-400 group-hover:text-zinc-300'
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
                  ? 'text-zinc-400 group-hover:text-zinc-300' 
                  : 'text-zinc-300 font-medium group-hover:text-white'
              }`}
            >
              {!lastMessage ? (
                <span className="text-zinc-500 italic group-hover:text-zinc-400">
                  Start a conversation
                </span>
              ) : lastMessage?.photo ? (
                <div className="flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  <span>
                    {lastMessage?.sender?._id === currentUser._id
                      ? 'You sent a photo'
                      : `${(lastMessage?.sender?.username || 'Someone').split(' ')[0]}: sent you a photo`}
                  </span>
                </div>
              ) : (
                <span className="line-clamp-1">
                  {lastMessage?.sender?._id === currentUser._id && (
                    <span className="text-zinc-400">You: </span>
                  )}
                  {lastMessage?.text}
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <Badge 
                className={`flex-shrink-0 ml-2 min-w-[1.25rem] h-5 px-1.5 text-xs font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-zinc-900 shadow-lg' 
                    : 'bg-indigo-500 text-white group-hover:bg-indigo-400'
                }`}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
