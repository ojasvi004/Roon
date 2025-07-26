'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import { Loader2, Users, Camera, Save, ArrowLeft, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  profileImage: string;
  _id: string;
}

interface Chat {
  name: string;
  groupPhoto: string;
  members: User[];
}

const GroupInfo = () => {
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [chat, setChat] = useState<Chat | null>(null);

  const { chatId } = useParams();
  const router = useRouter();

  const getChatDetails = useCallback(async () => {
    const controller = new AbortController();
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('failed to fetch chat details');
      const data = await response.json();
      setChat(data);
      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,
      });
      setLoading(false);
    } catch (error: unknown) {
      if ((error as Error).name !== 'AbortError') {
        console.log('error fetching chat details:', error);
        setErrorMessage('failed to load chat details');
      }
      setLoading(false);
    }

    return () => controller.abort();
  }, [chatId, reset]);

  useEffect(() => {
    if (chatId) {
      getChatDetails();
    }
  }, [chatId, getChatDetails]);

  const handleUploadPfp = (results: any) => {
    const secureUrl = results.info.secure_url || results.info;
    setValue('groupPhoto', secureUrl);
  };

  const onSubmit = async (data: unknown) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chats/${chatId}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        console.log('error:', errorResponse);
        throw new Error('failed to update group info');
      }
      router.push(`/chats/${chatId}`);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log('error updating group info:', error);
      setErrorMessage('error updating group information');
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-400" />
        <p className="text-gray-400">Loading group details...</p>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full p-4">
        <div className="flex-shrink-0 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Chat
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
              Edit Group Info
            </div>
            <p className="text-gray-400">Update your group name, photo, and view members</p>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 flex-shrink-0">
            <p className="text-red-400 text-center">{errorMessage}</p>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden flex-1 flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 flex flex-col h-full">
            
            <div className="text-center flex-shrink-0 mb-6">
              <div className="relative inline-block">
                <div className="relative">
                  <Image
                    src={watch('groupPhoto') || chat?.groupPhoto || '/assets/group.png'}
                    width={120}
                    height={120}
                    alt="Group Photo"
                    className="w-30 h-30 rounded-full object-cover border-4 border-gray-600 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  uploadPreset="nmkeeg8v"
                  onSuccess={handleUploadPfp}
                  className="absolute -bottom-1 -right-1 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                </CldUploadButton>
              </div>
              
              <p className="text-gray-400 text-sm mt-3">Click the camera icon to change group photo</p>
            </div>

            <div className="space-y-3 flex-shrink-0 mb-6">
              <label className="block text-sm font-medium text-gray-300">
                Group Name
              </label>
              <Input
                {...register('name', { required: 'Group chat name is required' })}
                type="text"
                placeholder="Enter group name..."
                className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12 text-lg"
              />
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-xs">!</span>
                  {typeof errors.name.message === 'string' && errors.name.message}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col min-h-0 mb-6">
              <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                <h3 className="text-lg font-semibold text-white">Group Members</h3>
                <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                  {chat?.members?.length || 0}
                </span>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <div className="divide-y divide-gray-700/50">
                    {chat?.members?.map((member, index) => (
                      <div key={index} className="p-4 flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={member.profileImage || '/assets/person.jpg'}
                            alt={member.username}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-600"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1">
                            <User className="w-3 h-3 text-indigo-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{member.username}</p>
                          <p className="text-sm text-gray-400">Member</p>
                        </div>
                      </div>
                    ))}
                    
                    {(!chat?.members || chat.members.length === 0) && (
                      <div className="p-8 text-center">
                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No members found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-shrink-0">
              <Button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-xl h-12 font-medium"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-medium shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
