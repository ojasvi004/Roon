'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from './ui/input';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { pusherClient } from '@/lib/pusher';
import Loader from './Loader';

interface Chat {
  _id: string;
  members: Array<{ _id: string; username: string; name?: string }>;
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
    username?: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
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
    if (!currentUser || !currentUser._id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        search !== ''
          ? `/api/users/${currentUser._id}/searchChat/${search}`
          : `/api/users/${currentUser._id}`
      );
      
      if (!response.ok) {
        setLoading(false);
        return;
      }
      
      const data: Chat[] = await response.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser._id) {
      const delayDebounce = setTimeout(() => {
        getChats();
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat: any) => {
        setChats((allChats) =>
          allChats.map((chat) =>
            chat._id === updatedChat.id ? { 
              ...chat, 
              messages: updatedChat.messages || chat.messages,
              lastMessageAt: updatedChat.lastMessageAt || chat.lastMessageAt
            } : chat
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

  if (!currentUser || !currentUser._id) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>Please log in to view chats</p>
      </div>
    );
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
        {sortedChats?.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No chats found</p>
            <p className="text-xs mt-2">
              Try starting a conversation or check if you're part of any groups
            </p>
          </div>
        ) : (
          sortedChats.map((chat) => (
            <ChatBox
              key={chat._id}
              chat={chat}
              currentUser={currentUser}
              currentChatId={currentChatId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;