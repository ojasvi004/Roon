'use client';
import Contacts from '@/components/Contacts';
import ChatList from '@/components/ChatList';

const Chats = () => {


  return (
    <div className="grid grid-cols-12 min-h-screen overflow-hidden">
      <div className="col-span-4 min-w-96 bg-indigo-50 bg-opacity-50 backdrop-blur-2xl">
        <ChatList />
      </div>

      <div className="col-span-6 flex justify-end text-center ">
        <Contacts />
      </div>
    </div>
  );
};

export default Chats;
