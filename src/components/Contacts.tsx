'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Users, MessageCircle, Check, Plus, X } from 'lucide-react';
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

  useEffect(() => {
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
    <div className="flex justify-center items-center h-64">
      <Loader />
    </div>
  ) : (
    <div className="max-w-2xl mx-auto p-6 max-h-[800px] h-[800px] flex flex-col w-full overflow-hidden">
      <div className="text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-white">
          <Users className="w-6 h-6 text-indigo-400" />
          Start New Chat
        </div>
        <p className="text-gray-400 text-sm">
          Select contacts to start a conversation
        </p>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search contacts..."
          className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {selectedContacts.length > 0 && (
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 mb-4 h-24 overflow-y-auto flex-shrink-0 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-300">Selected:</span>
            <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
              {selectedContacts.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {selectedContacts.map((contact) => (
              <div
                key={contact._id}
                className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-sm flex-shrink-0 min-w-0"
              >
                <Image
                  src={contact.profileImage || '/assets/person.jpg'}
                  alt={contact.name}
                  className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                  height={16}
                  width={16}
                />
                <span className="truncate max-w-20">{contact.name}</span>
                <button
                  onClick={() => handleSelect(contact)}
                  className="hover:bg-indigo-400/20 rounded-full p-0.5 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isGroup && (
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 mb-4 flex-shrink-0">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Group Name
          </label>
          <Input
            placeholder="Enter group name..."
            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          <h3 className="font-medium text-gray-300">Available Contacts</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-8 text-center h-full flex flex-col justify-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No contacts found</p>
              <p className="text-gray-500 text-sm mt-1">
                {search
                  ? 'Try adjusting your search'
                  : 'Add some friends to get started'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/50">
              {contacts.map((user) => {
                const isSelected = selectedContacts.some(
                  (item) => item._id === user._id
                );
                return (
                  <div
                    key={user._id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-700/30 ${
                      isSelected
                        ? 'bg-indigo-500/10 border-r-2 border-indigo-500'
                        : ''
                    }`}
                    onClick={() => handleSelect(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={user.profileImage || '/assets/person.jpg'}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600"
                          height={48}
                          width={48}
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 bg-indigo-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">
                          {(user as any).username || user.name}
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          {user.name !== (user as any).username
                            ? user.name
                            : 'Available'}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-500 border-indigo-500'
                            : 'border-gray-500 hover:border-indigo-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 mt-4">
        <button
          className={`w-full py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            selectedContacts.length === 0
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25'
          }`}
          onClick={createChat}
          disabled={selectedContacts.length === 0}
        >
          <MessageCircle className="w-5 h-5" />
          {selectedContacts.length === 0
            ? 'Select contacts to continue'
            : `Start ${isGroup ? 'Group ' : ''}Chat${selectedContacts.length > 1 ? ` (${selectedContacts.length})` : ''}`}
        </button>
      </div>
    </div>
  );
};

export default Contacts;
