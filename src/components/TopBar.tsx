"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const TopBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <Link href="/chats">chat-app</Link>

      <Link
        href="/chats"
        className={`${pathname === "/chats" ? "text-red-1" : ""} text-heading-bold`}
      >
        Chats
      </Link>

      <Link
        href="/contacts"
        className={`${pathname === "/contacts" ? "text-red-1" : ""} text-heading-bold`}
      >
        Contacts
      </Link>

      <button onClick={handleLogout}>Logout</button>

      {user && (
        <Link href="/profile">
          <Image
            src={user.profileImage || "/assets/person.jpg"}
            alt="Profile"
            width={40}
            height={40} 
            className="rounded-full" 
          />
        </Link>
      )}
    </div>
  );
};

export default TopBar;
