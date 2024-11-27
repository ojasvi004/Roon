'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IoIosLogOut } from 'react-icons/io';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { PiCatFill } from "react-icons/pi";

const TopBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center px-3 py-3 bg-gray-700 text-white h-screen">
      <Link href="/chats" className="text-5xl text-gray-300 font-bold">
      <PiCatFill />
      </Link>

      <div className="flex flex-col mt-6">
        <Link
          href="/chats"
          className={`${
            pathname === '/chats'
              ? 'text-gray-200 bg-indigo-500 w-12 h-12 rounded-full '
              : 'text-gray-400  bg-gray-700 w-12 h-12 rounded-full '
          } text-2xl flex items-center justify-center font-semibold hover:text-gray-100`}
        >
          <BsChatLeftTextFill />
        </Link>

        <Link
          href="/contacts"
          className={`${
            pathname === '/contacts'
              ? 'text-gray-200 bg-indigo-500 w-12 h-12 rounded-full '
              : 'text-gray-400  bg-gray-700 w-12 h-12 rounded-full '
          } text-2xl flex items-center justify-center font-semibold hover:text-gray-100 mt-2`}
        >
          <RiContactsBook2Fill />
        </Link>
      </div>

      <div className="flex flex-col items-center mt-auto">
        {user && (
          <Link href="/profile">
            <Image
              src={user.profileImage || '/assets/person.jpg'}
              alt="Profile"
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="hover:text-gray-300 text-2xl mt-2"
          title="Logout"
        >
          <IoIosLogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
