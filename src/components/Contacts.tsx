"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import Image from "next/image";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await res.json();
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  return loading ? (
    <Loader2 />
  ) : (
    <div className="flex justify-end">
      <div className="border-solid border-1 bg-violet-200 rounded-xl w-[400px] p-4 ">
        
        <input
          type="text"
          placeholder="Search contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full p-2 rounded"
        />

        <p>Select or Deselect</p>

        {contacts.map((user, index) => (
          <div key={index} className="flex items-center p-2">
            <RadioButtonUnchecked className="mr-3"/>
            <Image
              src={user.profileImage || "/assets/person.jpg"}
              alt="pfp"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <p>{user.username}</p>
          </div>
        ))}

        <div className="mt-4">
          <button>Start a new chat</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
