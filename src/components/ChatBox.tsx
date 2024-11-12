"use client";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";

const ChatBox = ({ chat, currentUser }) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];

  return (
    <div className="flex hover:bg-indigo-200 rounded-lg mb-1">
      {chat?.isGroup ? (
        <Image
          src={chat?.groupPhoto || "/assets/group.png"}
          alt="group-pfp"
          height={50}
          width={50}
          className="rounded-full"
        />
      ) : (
        <Image
          src={otherMembers[0].profileImage || "/assets/person.png"}
          alt="pfp"
          height={50}
          width={50}
          className="rounded-full"
        />
      )}
      <div className="flex">
        <div className="flex flex-col gap-1">
          {chat?.isGroup ? (
            <p className="ml-4">{chat?.name}</p>
          ) : (
            <p className="ml-4">{otherMembers[0]?.username}</p>
          )}
          {!lastMessage && <p className="ml-4">start a chat</p>}
        </div>
        <div>
          {!lastMessage
            ? format(new Date(chat?.createdAt), "p")
            : format(new Date(chat?.lastMessageAt), "p")}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
