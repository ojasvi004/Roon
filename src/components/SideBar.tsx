'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IoIosLogOut } from 'react-icons/io';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { PiCatFill } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
  };
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user?._id) return;

      try {
        const response = await fetch(`/api/users/${user._id}`);
        if (response.ok) {
          const chats = await response.json();

          const totalUnread = chats.reduce((total: number, chat: any) => {
            const unreadCount =
              chat.messages?.filter(
                (message: any) =>
                  message.sender._id !== user._id &&
                  !message.seenBy?.some(
                    (member: any) => member._id === user._id
                  )
              ).length || 0;
            return total + unreadCount;
          }, 0);

          setTotalUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, [user]);

  const handleLogout = async () => {
    signOut({ callbackUrl: '/' });
  };

  const NavLink = ({
    href,
    icon: Icon,
    label,
    isActive,
    badgeCount,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    badgeCount?: number;
  }) => (
    <Link
      href={href}
      className={`group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/35'
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
      }`}
      title={label}
    >
      <div className="relative flex items-center justify-center">
        <Icon size={24} className="transition-transform duration-200" />
        {badgeCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
            {badgeCount > 99 ? '99+' : badgeCount}
          </div>
        )}
      </div>
      {isActive && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-400 rounded-l-full" />
      )}
    </Link>
  );

  return (
    <div className="flex flex-col bg-zinc-950 border-r border-zinc-800/50 text-white h-full">
      <div className="hidden sm:flex flex-col h-screen w-16 py-6">
        <div className="flex items-center justify-center mb-8">
          <Link
            href="/chats"
            className="group flex items-center justify-center w-14 h-14 bg-zinc-900 rounded-xl transition-all duration-200"
          >
            <PiCatFill className="text-4xl text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200" />
          </Link>
        </div>

        <nav className="flex-1 flex flex-col items-center space-y-3">
          <NavLink
            href="/chats"
            icon={BsChatLeftTextFill}
            label="Chats"
            isActive={pathname === '/chats'}
            badgeCount={totalUnreadCount}
          />
          <NavLink
            href="/contacts"
            icon={RiContactsBook2Fill}
            label="Contacts"
            isActive={pathname === '/contacts'}
          />
        </nav>

        {user && (
          <div className="flex flex-col items-center space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="group relative flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src={(user as any).profileImage || '/assets/person.jpg'}
                      alt="Profile"
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-xl object-cover border-2 border-zinc-800 group-hover:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded-xl shadow-2xl p-3 flex flex-col gap-1 w-52 ml-4"
              >
                <div className="px-3 py-2 border-b border-zinc-700/50 mb-1">
                  <p className="text-sm font-medium text-zinc-200">
                    {(user as any).username || (user as any).name || 'User'}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {(user as any).email || (user as any).id}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
                >
                  <IoSettingsOutline className="text-base" />
                  Update Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <IoIosLogOut className="text-base" />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-sm z-50 border-t border-zinc-800/50">
        <div className="flex justify-around items-center py-3 px-4">
          <NavLink
            href="/chats"
            icon={BsChatLeftTextFill}
            label="Chats"
            isActive={pathname === '/chats'}
            badgeCount={totalUnreadCount}
          />
          <NavLink
            href="/contacts"
            icon={RiContactsBook2Fill}
            label="Contacts"
            isActive={pathname === '/contacts'}
          />

          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="group relative flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src={(user as any).profileImage || '/assets/person.jpg'}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-lg object-cover border-2 border-zinc-800 group-hover:border-indigo-500 transition-all duration-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-950"></div>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded-xl shadow-2xl p-3 flex flex-col gap-1 w-52 mb-4"
              >
                <div className="px-3 py-2 border-b border-zinc-700/50 mb-1">
                  <p className="text-sm font-medium text-zinc-200 truncate">
                    {(user as any).username || (user as any).name || 'User'}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {(user as any).email || (user as any).id}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
                >
                  <IoSettingsOutline className="text-base" />
                  Update Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <IoIosLogOut className="text-base" />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
