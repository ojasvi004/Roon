'use client';
import '../globals.css';
import SideBar from '@/components/SideBar';
import ChatList from '@/components/ChatList';
import { usePathname, useParams } from 'next/navigation';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { chatId } = useParams();
  const pathname = usePathname();
  const hideChatList = pathname === '/profile';

  return (
    <div className="flex flex-col sm:h-screen sm:overflow-hidden sm:flex-row bg-gray-900 text-white overflow-hidden font-sans">
      <SideBar />

      <div className="flex flex-col sm:flex-row flex-grow min-h-screen w-full">
        {!hideChatList && (
          <div className="sm:w-96 bg-gray-800 bg-opacity-50 backdrop-blur-2xl overflow-y-auto sm:overflow-hidden sm:h-screen">
            <ChatList currentChatId={Array.isArray(chatId) ? chatId[0] : chatId || null} />
          </div>
        )}

        <div
          className={`
            flex-grow overflow-auto
            ${hideChatList ? 'flex justify-center items-center h-screen' : ''}
            ${!hideChatList ? 'sm:w-[calc(100%-24rem)]' : ''}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

