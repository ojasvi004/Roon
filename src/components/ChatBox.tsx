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
      className={`group cursor-pointer transition-all duration-200 rounded-xl p-3 mb-2 ${
        isActive
          ? 'bg-indigo-600/20 border border-indigo-500/30 shadow-lg'
          : 'hover:bg-gray-800/50 border border-transparent'
      }`}
      onClick={() => router.push(`/chats/${chat._id}`)}
    >
      <div className="flex gap-3 items-center">
        <div className="relative flex-shrink-0">
          {chat?.isGroup ? (
            <div className="relative">
              <Image
                src={chat?.groupPhoto || '/assets/group.png'}
                alt="group-pfp"
                height={48}
                width={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600"
              />
              <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1">
                <Users className="w-3 h-3 text-indigo-400" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={otherMembers[0]?.profileImage || '/assets/person.jpg'}
                alt="pfp"
                height={48}
                width={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600"
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3
              className={`font-semibold truncate ${
                isActive ? 'text-white' : 'text-gray-200'
              }`}
            >
              {chat?.isGroup ? chat?.name : otherMembers[0]?.username}
            </h3>

            <span
              className={`text-xs flex-shrink-0 ml-2 ${
                isActive ? 'text-indigo-300' : 'text-gray-400'
              }`}
            >
              {!lastMessage
                ? format(new Date(chat?.createdAt), 'p')
                : format(new Date(chat?.lastMessageAt), 'p')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={`text-sm truncate ${
                seen ? 'text-gray-400' : 'text-gray-300 font-medium'
              }`}
            >
              {!lastMessage ? (
                <span className="text-gray-500 italic">
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
                  {lastMessage?.sender?._id === currentUser._id && 'You: '}
                  {lastMessage?.text}
                </span>
              )}
            </div>

            {!seen &&
              lastMessage &&
              lastMessage?.sender?._id !== currentUser._id && (
                <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 ml-2"></div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
