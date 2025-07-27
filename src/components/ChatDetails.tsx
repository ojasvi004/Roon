import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CldUploadButton } from 'next-cloudinary';
import {
  Send,
  Image as ImageIcon,
  Users,
  ArrowLeft,
  MoreVertical,
} from 'lucide-react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/lib/pusher';
import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const currentUser = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
  };

  const [text, setText] = useState('');

  useEffect(() => {
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
      console.error('Error sending message:', error);
    }
  };

  const sendPhoto = async (result: CloudinaryUploadWidgetResults) => {
    const photoUrl =
      typeof result.info === 'string' ? result.info : result.info?.secure_url;

    if (!photoUrl) return;

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
      console.error('Error sending photo:', error);
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
          if (!prevChat) return prevChat;
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
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-400" />
        <p className="text-gray-400">Loading chat...</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full h-screen bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="lg:hidden p-1.5 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>

          {chat?.isGroup ? (
            <Link
              href={`/chats/${chatId}/group-info`}
              className="flex items-center gap-2 hover:bg-gray-700/50 px-2 py-1 rounded-lg transition-colors"
            >
              <div className="relative">
                <Image
                  src={chat?.groupPhoto || '/assets/group.png'}
                  alt="group-photo"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-600"
                  height={36}
                  width={36}
                />
                <div className="absolute -bottom-0.5 -right-0.5 bg-gray-800 rounded-full p-0.5">
                  <Users className="w-2.5 h-2.5 text-indigo-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-white truncate">
                  {chat?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {chat?.members?.length} members
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Image
                  src={otherMembers[0]?.profileImage || '/assets/person.jpg'}
                  alt="profile photo"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-600"
                  height={36}
                  width={36}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-white truncate">
                  {otherMembers[0]?.username}
                </p>
              </div>
            </div>
          )}
        </div>

        <button className="p-1.5 hover:bg-gray-700 rounded-full transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {chat?.messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-800/50 rounded-full p-6 mb-4">
              {chat?.isGroup ? (
                <Users className="w-12 h-12 text-gray-500" />
              ) : (
                <Image
                  src={otherMembers[0]?.profileImage || '/assets/person.jpg'}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                  height={48}
                  width={48}
                />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {chat?.isGroup
                ? `Welcome to ${chat?.name}`
                : `Chat with ${otherMembers[0]?.username}`}
            </h3>
            <p className="text-gray-400">
              {chat?.isGroup
                ? 'This is the beginning of your group conversation.'
                : 'This is the beginning of your conversation.'}
            </p>
          </div>
        ) : (
          <>
            {chat?.messages?.map((message, index) => (
              <MessageBox
                key={index}
                message={message}
                currentUser={currentUser}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 sticky bottom-0 z-10">
        <div className="flex items-center gap-3 bg-gray-800/50 rounded-2xl p-2 border border-gray-700">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            uploadPreset="nmkeeg8v"
            onSuccess={sendPhoto}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors group"
          >
            <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
          </CldUploadButton>

          <Input
            type="text"
            placeholder={
              chat?.isGroup
                ? 'Type a message...'
                : `Message ${otherMembers[0]?.username}...`
            }
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={sendText}
            disabled={!text.trim()}
            className={`p-2 rounded-full transition-all ${
              text.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
