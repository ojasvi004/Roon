'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from './ui/input';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { pusherClient } from '@/lib/pusher';
import Loader from './Loader';
import { Search, MessageCircle, Users, X } from 'lucide-react';

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
    <div className="flex items-center justify-center h-64">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col h-full bg-gray-900/50 backdrop-blur-sm">
      <div className="flex-shrink-0 px-4 py-4 border-b border-gray-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600/10 rounded-lg">
            <MessageCircle className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Messages</h2>
            <p className="text-xs text-gray-400">
              {sortedChats.length} {sortedChats.length === 1 ? 'conversation' : 'conversations'}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-10 py-2.5 bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 rounded-xl focus:bg-gray-800/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedChats?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12">
            <div className="p-4 bg-gray-800/30 rounded-full mb-4">
              {search ? (
                <Search className="w-8 h-8 text-gray-500" />
              ) : (
                <Users className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              {search ? 'No matches found' : 'No conversations yet'}
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              {search 
                ? `No conversations match "${search}". Try a different search term.`
                : 'Start chatting by creating a new conversation or joining an existing group.'
              }
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-colors text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="px-3 py-2 space-y-1">
            {search && (
              <div className="px-3 py-2 text-sm text-gray-400 border-b border-gray-800/30 mb-2">
                {sortedChats.length} result{sortedChats.length !== 1 ? 's' : ''} for "{search}"
              </div>
            )}
            {sortedChats.map((chat, index) => (
              <div
                key={chat._id}
                className="animate-in slide-in-from-left duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ChatBox
                  chat={chat}
                  currentUser={currentUser}
                  currentChatId={currentChatId}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;