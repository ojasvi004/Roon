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
  }, [currentUser]);

  return loading ? (
    <Loader2 />
  ) : (
    <div>
      <input
        type="text"
        placeholder="search contact"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Select or Deselect</p>
      {contacts.map((user, index) => (
        <div key={index} className="flex items-center justify-between p-2">
          <RadioButtonUnchecked />

          <Image
            src={user.profileImage || "/assets/person.jpg"}
            alt="pfp"
            width={40}
            height={40}
          />
          <p>{user.username}</p>
        </div>
      ))}

      <div>
        <button>Start a new chat</button>
      </div>
    </div>
  );
};

export default Contacts;
