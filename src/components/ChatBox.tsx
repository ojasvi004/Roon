'use client';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

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

  return (
    <div
      className={`chat-box p-2 rounded-3xl ${
        chat._id === currentChatId ? 'bg-gray-500 ' : 'hover:bg-gray-400'
      } cursor-pointer mb-2`}
      onClick={() => router.push(`/chats/${chat._id}`)}
    >
      <div className="flex gap-3 items-center">
        {chat?.isGroup ? (
          <Image
            src={chat?.groupPhoto || '/assets/group.png'}
            alt="group-pfp"
            height={50}
            width={50}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <Image
            src={otherMembers[0]?.profileImage || '/assets/person.png'}
            alt="pfp"
            height={50}
            width={50}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <p className=" text-gray-300 font-semibold">
              {chat?.isGroup ? chat?.name : otherMembers[0]?.username}
            </p>
            <p className="text-sm text-gray-300">
              {!lastMessage
                ? format(new Date(chat?.createdAt), 'p')
                : format(new Date(chat?.lastMessageAt), 'p')}
            </p>
          </div>
          <div className="text-base mt-1 text-gray-800">
            {!lastMessage && <p>Start a chat</p>}
            {lastMessage?.photo ? (
              lastMessage?.sender?._id === currentUser._id ? (
                <p>You sent a photo</p>
              ) : (
                <p className={`${seen ? 'text-gray-400' : 'font-semibold'}`}>
                  Received a photo
                </p>
              )
            ) : (
              <p className={`${seen ? 'text-gray-400' : 'font-semibold'}`}>
                {lastMessage?.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
