'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from './ui/input';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { pusherClient } from '@/lib/pusher';
import Loader from './Loader';

interface Chat {
  _id: string;
  members: Array<{ _id: string; name: string }>;
  lastMessageAt: string;
  messages: Array<{ senderId: string; content: string; timestamp: string }>;
}

interface ChatListProps {
  currentChatId: string;
}

const ChatList: React.FC<ChatListProps> = ({ currentChatId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [search, setSearch] = useState('');

  const sortedChats = useMemo(() => {
    return chats
      .slice()
      .sort(
        (a, b) =>
          new Date(b.lastMessageAt).getTime() -
          new Date(a.lastMessageAt).getTime()
      );
  }, [chats]);

  const getChats = async () => {
    try {
      const response = await fetch(
        search !== ''
          ? `/api/users/${currentUser._id}/searchChat/${search}`
          : `/api/users/${currentUser._id}`
      );
      const data: Chat[] = await response.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const delayDebounce = setTimeout(() => {
        getChats();
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat: Chat) => {
        setChats((allChats) =>
          allChats.map((chat) =>
            chat._id === updatedChat._id ? { ...chat, ...updatedChat } : chat
          )
        );
      };

      const handleNewChat = (newChat: Chat) => {
        setChats((allChats) => [...allChats, newChat]);
      };

      pusherClient.bind('update-chat', handleChatUpdate);
      pusherClient.bind('new-chat', handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id);
        pusherClient.unbind('update-chat', handleChatUpdate);
        pusherClient.unbind('new-chat', handleNewChat);
      };
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view chats</div>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="pl-4 pr-4 max-h-screen overflow-y-auto">
      <Input
        type="text"
        placeholder="search chat"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 mt-3 text-black rounded-full bg-gray-300"
      />
      <div>
        {sortedChats?.map((chat) => (
          <ChatBox
            key={chat._id}
            chat={chat}
            currentUser={currentUser}
            currentChatId={currentChatId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
