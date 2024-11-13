"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import { IoIosSend } from "react-icons/io";

const ChatDetails = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setChat(data);
      setOtherMembers(
        data?.members?.filter((member) => member._id !== currentUser._id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        }),
      });

      if (res.ok) {
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendPhoto = async (result) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          photo: result?.info?.secure_url,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bottomRef = useRef(null);

  return loading ? (
    <Loader2 className="mx-auto mt-20" />
  ) : (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center p-2 border-b bg-gray-700">
        {chat?.isGroup ? (
          <>
            <Link href={`/chats/${chatId}/group-info`}>
              <img
                src={chat?.groupPhoto || "/assets/group.png"}
                alt="group-photo"
                className="w-12 h-12 rounded-full cursor-pointer"
              />
            </Link>
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-200">
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                members
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={otherMembers[0].profileImage || "/assets/person.jpg"}
              alt="profile photo"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {otherMembers[0].username}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 flex items-center space-x-4 bg-gray-800">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={sendPhoto}
          uploadPreset="upecg01j"
        >
          <AddPhotoAlternate
            sx={{
              fontSize: "35px",
              color: "#737373",
              cursor: "pointer",
              "&:hover": { color: "gray" },
            }}
            className="text-gray-500 hover:text-indigo-500"
          />
        </CldUploadButton>

        <input
          type="text"
          placeholder={
            chat?.isGroup
              ? "Write a message"
              : `message @${otherMembers[0].username}`
          }
          className="flex-1  rounded-lg p-2 bg-gray-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <div onClick={sendText} className="cursor-pointer">
          <IoIosSend className="text-2xl text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
