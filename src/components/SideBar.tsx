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

  return (
    <div className="flex flex-col items-center px-4 py-6 bg-gray-900 text-white h-screen">
      {/* Logo */}
      <Link href="/chats" className="text-4xl text-gray-300 font-bold">
        <PiCatFill />
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col mt-8 space-y-4">
        <Link
          href="/chats"
          className={`${
            pathname === '/chats' ? 'bg-indigo-600' : 'bg-gray-700'
          } text-white p-3 rounded-full transition duration-200 hover:bg-indigo-500`}
        >
          <BsChatLeftTextFill size={24} />
        </Link>

        <Link
          href="/contacts"
          className={`${
            pathname === '/contacts' ? 'bg-indigo-600' : 'bg-gray-700'
          } text-white p-3 rounded-full transition duration-200 hover:bg-indigo-500`}
        >
          <RiContactsBook2Fill size={24} />
        </Link>
      </div>

      {/* User Profile and Logout */}
      <div className="flex items-center mt-auto">
        {user && (
          <Popover>
            <PopoverTrigger>
              <Image
                src={user.profileImage || '/assets/person.jpg'}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
              />
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800 text-white rounded-lg shadow-md p-4 flex flex-col gap-2">
              {/* Profile Update */}
              <Link
                href="/profile"
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200"
              >
                Update Profile
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-gray-100 transition duration-200 flex items-center"
                title="Logout"
              >
                <IoIosLogOut className="inline-block mr-1" />
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
