"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import ChatBox from "./ChatBox";

const ChatList = ({ currentChatId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const response = await fetch(
        search !== ""
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

  console.log(chats);
  return loading ? (
    <Loader2 />
  ) : (
    <div>
      <Input
        type="text"
        placeholder="search chat"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mb-3 mt-3 text-black"
      />
      <div>
        {chats?.map((chat, index) => (
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
