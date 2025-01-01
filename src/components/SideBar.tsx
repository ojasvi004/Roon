'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IoIosLogOut } from 'react-icons/io';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { PiCatFill } from 'react-icons/pi';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    signOut({ callbackUrl: '/' });
  };

  const NavLink = ({ href, icon: Icon, isActive }: { href: string; icon: React.ElementType; isActive: boolean }) => (
    <Link
      href={href}
      className={`${
        isActive ? 'bg-indigo-600' : 'bg-gray-700'
      } text-white p-3 rounded-full transition duration-200 hover:bg-indigo-500 flex items-center justify-center`}
    >
      <Icon size={24} />
    </Link>
  );

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full">
      <div className="hidden sm:flex flex-col h-screen w-16 py-4">
        <Link href="/chats" className="text-2xl text-gray-300 font-bold mb-8 flex justify-center">
          <PiCatFill />
        </Link>

        <div className="flex-1 flex flex-col items-center space-y-4">
          <NavLink href="/chats" icon={BsChatLeftTextFill} isActive={pathname === '/chats'} />
          <NavLink href="/contacts" icon={RiContactsBook2Fill} isActive={pathname === '/contacts'} />
        </div>

        {user && (
          <Popover>
            <PopoverTrigger>
              <Image
                src={(user as any).profileImage || '/assets/person.jpg'}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
              />
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800/70 border-none rounded-lg shadow-md p-4 flex flex-col gap-2 w-48 ml-2 mb-1">
              <Link
                href="/profile"
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200"
              >
                Update Profile
              </Link>
              <hr className="border-gray-600" />
              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200 flex items-center"
                title="Logout"
              >
                <IoIosLogOut className="inline-block mr-1 text-xl" />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="sm:hidden fixed top-0 left-0 right-0 bg-gray-900 z-50 flex justify-around items-center py-2 px-4 border-b border-gray-800">
        <NavLink href="/chats" icon={BsChatLeftTextFill} isActive={pathname === '/chats'} />
        <NavLink href="/contacts" icon={RiContactsBook2Fill} isActive={pathname === '/contacts'} />
        {user && (
          <Popover>
            <PopoverTrigger>
              <Image
                src={(user as any).profileImage || '/assets/person.jpg'}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
              />
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800/70 border-none rounded-lg shadow-md p-4 flex flex-col gap-2 w-48 mb-16">
              <Link
                href="/profile"
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200"
              >
                Update Profile
              </Link>
              <hr className="border-gray-600" />
              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200 flex items-center"
                title="Logout"
              >
                <IoIosLogOut className="inline-block mr-1 text-xl" />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default SideBar;
