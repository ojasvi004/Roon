import { useState, useEffect, useRef } from 'react';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CldUploadButton } from 'next-cloudinary';
import { IoIosSend } from 'react-icons/io';
import MessageBox from './MessageBox';
import { pusherClient } from '@/lib/pusher';
import Loader from './Loader';
import { Input } from './ui/input';
import Image from 'next/image';

interface Member {
  _id: string;
  username: string;
  profileImage?: string;
}

interface Chat {
  _id: string;
  name: string;
  isGroup: boolean;
  groupPhoto?: string;
  members: Member[];
  messages: any[];
}

interface ChatDetailsProps {
  chatId: string;
}

interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

interface CloudinaryUploadWidgetResults {
  info?: string | CloudinaryUploadWidgetInfo;
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const [otherMembers, setOtherMembers] = useState<Member[]>([]);
  const { data: session } = useSession();
  const currentUser = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
  };

  const [text, setText] = useState('');

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: Chat = await res.json();
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
    if (text.trim() === '') return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        }),
      });

      if (res.ok) {
        setText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendPhoto = async (result: CloudinaryUploadWidgetResults) => {
    const photoUrl =
      typeof result.info === 'string' ? result.info : result.info.secure_url;

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          photo: photoUrl,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chat?.messages]);

  useEffect(() => {
    if (chatId && pusherClient) {
      pusherClient.subscribe(chatId);
      const handleMessage = (newMessage: any) => {
        setChat((prevChat) => {
          return {
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
          };
        });
      };
      pusherClient.bind('new-message', handleMessage);

      return () => {
        pusherClient.unsubscribe(chatId);
        pusherClient.unbind('new-message', handleMessage);
      };
    }
  }, [chatId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col w-full h-screen relative"> 
      <div className="flex items-center p-4 border-b bg-gray-700 sticky top-0 z-50">
        {chat?.isGroup ? (
          <>
            <Link href={`/chats/${chatId}/group-info`}>
              <Image
                src={chat?.groupPhoto || '/assets/group.png'}
                alt="group-photo"
                className="w-12 h-12 rounded-full cursor-pointer object-cover"
                height={50}
                width={50}
              />
            </Link>
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-200">
                {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{' '}
                members
              </p>
            </div>
          </>
        ) : (
          <>
            <Image
              src={otherMembers[0]?.profileImage || '/assets/person.jpg'}
              alt="profile photo"
              className="w-12 h-12 rounded-full object-cover"
              height={50}
              width={50}
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {otherMembers[0]?.username}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gray-900 pb-16">
        {chat?.messages?.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center p-4 bg-gray-800 sticky bottom-0 z-10">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          uploadPreset="nmkeeg8v"
          onSuccess={sendPhoto}
        >
          <AddPhotoAlternate
            sx={{
              fontSize: '35px',
              color: '#737373',
              cursor: 'pointer',
              '&:hover': { color: 'gray' },
            }}
            className="text-gray-500 mr-4"
          />
        </CldUploadButton>

        <Input
          type="text"
          placeholder={
            chat?.isGroup
              ? 'Write a message'
              : `message @${otherMembers[0]?.username}`
          }
          className="flex-1 rounded-lg p-2 bg-gray-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          onKeyDown={handleKeyDown}
        />

        <div onClick={sendText} className="cursor-pointer">
          <IoIosSend className="text-3xl ml-4 text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
