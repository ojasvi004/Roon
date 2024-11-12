"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";

const TopBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-violet-500 text-white ">
      <Link href="/chats" className="text-2xl font-bold">
        chat-app
      </Link>

      <div className="flex space-x-6">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-gray-700" : "text-white"
          } text-lg font-semibold hover:text-gray-300`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-red-400" : "text-white"
          } text-lg font-semibold hover:text-gray-300`}
        >
          Contacts
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <Link href="/profile">
            <Image
              src={user.profileImage || "/assets/person.jpg"}
              alt="Profile"
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-full object-cover mx-auto"
            />
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="hover:text-gray-300 text-2xl"
          title="Logout"
        >
          <IoIosLogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
