'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import Loader from './Loader';
import Image from 'next/image';

type Contact = {
  _id: string;
  name: string;
  profileImage?: string;
};

const Contacts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const isGroup = selectedContacts.length > 1;

  const { data: session } = useSession();
  const currentUser = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
  };
  const router = useRouter();

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== '' ? `/api/users/searchContact/${search}` : '/api/users'
      );
      const data = await res.json();
      if (currentUser) {
        setContacts(
          data.filter((contact: Contact) => contact._id !== currentUser._id)
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  const handleSelect = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.some((item) => item._id === contact._id)) {
        return prevSelectedContacts.filter((item) => item._id !== contact._id);
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  const createChat = async () => {
    const res = await fetch('/api/chats', {
      method: 'POST',
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };

  return loading ? (
    <div className="flex">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="w-96 max-w-lg mt-8">
        <Input
          placeholder="Search contact"
          className="w-full p-2 mb-4  bg-gray-700 rounded-md border-null focus:outline-none "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-400">Select or Deselect</p>

            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              {contacts.map((user) => (
                <div
                  key={user._id}
                  className="flex gap-2 p-2 bg-gray-600  hover:bg-gray-500 rounded-md cursor-pointer"
                  onClick={() => handleSelect(user)}
                >
                  {selectedContacts.some((item) => item._id === user._id) ? (
                    <CheckCircle sx={{ color: 'red' }} />
                  ) : (
                    <RadioButtonUnchecked className="text-indigo-500" />
                  )}
                  <Image
                    src={user.profileImage || '/assets/person.jpg'}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                    height={50}
                    width={50}
                  />
                  <p className="font-medium  text-gray-400">{(user as any).username}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {isGroup && (
              <>
                <div className="mb-4">
                  <p className="font-semibold text-gray-400">Group Chat Name</p>
                  <Input
                    placeholder="Enter group chat name"
                    className="w-full p-2 mt-1 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-400">Members</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContacts.map((user) => (
                      <span
                        key={user._id}
                        className="px-2 py-1 text-sm  text-white bg-indigo-500 rounded-md"
                      >
                        {user.name}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            <button
              className={`w-full py-2 mt-6 font-semibold text-white rounded-full ${
                selectedContacts.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
              onClick={createChat}
              disabled={selectedContacts.length === 0}
            >
              START A NEW CHAT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
