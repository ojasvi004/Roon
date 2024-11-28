'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from './ui/input';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { pusherClient } from '@/lib/pusher';
import Loader from './Loader';

const ChatList = ({ currentChatId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');

  const sortedChats = useMemo(() => {
    return [...chats].sort(
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
      const data = await response.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat) => {
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

  console.log(chats);
  return loading ? (
    <Loader />
  ) : (
    <div className="pl-4 pr-4">
      <Input
        type="text"
        placeholder="search chat"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mb-3 mt-3 text-black rounded-full bg-gray-300"
      />
      <div>
        {sortedChats?.map((chat, index) => (
          <ChatBox
            key={index}
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
