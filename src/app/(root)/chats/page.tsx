import Contacts from "@/components/Contacts";
import ChatList from "@/components/ChatList";
const Chats = () => {
  return (
    <div className="flex">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full bg-indigo-50 bg-opacity-50 min-h-screen backdrop-blur-2xl">
        <ChatList />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden flex justify-end">
        <Contacts />
      </div>
    </div>
  );
};

export default Chats;
