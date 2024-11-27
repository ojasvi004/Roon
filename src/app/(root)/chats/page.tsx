'use client';
import Contacts from '@/components/Contacts';
import ChatList from '@/components/ChatList';
import { usePathname } from 'next/navigation';
const Chats = () => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-12 min-h-screen overflow-hidden">
      <div className="col-span-4 min-w-96 bg-gray-500 bg-opacity-50 backdrop-blur-2xl">
        <ChatList />
      </div>

      {pathname == '/contacts' ? (
        <div className="col-span-5 flex items-center text-center justify-end">
          <Contacts />
        </div>
      ) : (
        <div className="col-span-5 flex items-center text-center justify-end">
          <p>Start chat</p>
        </div>
      )}
    </div>
  );
};

export default Chats;
