'use client';
import ChatDetails from '@/components/ChatDetails';
import ChatList from '@/components/ChatList';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

import React, { useEffect } from 'react';

const ChatPage = () => {
  const { chatId } = useParams();
  const { data: session } = useSession();
  const currentUser = session?.user;

  const seenMessages = async () => {
    try {
      await fetch(`/api/chats/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserId: currentUser._id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) seenMessages();
  }, [currentUser, chatId]);

  return (
    <div className="grid grid-cols-[1fr,3fr] min-h-screen">
      <div className="min-w-96 bg-indigo-50 bg-opacity-50 backdrop-blur-2xl">
        <ChatList currentChatId={chatId} />
      </div>

      <div className="w-full">
        <ChatDetails chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
