'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import { Loader2 } from 'lucide-react';
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
    <div className="flex">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <div className="flex flex-col justify-center mr-auto ml-auto">
      <h1 className="text-3xl text-center mb-7 text-gray-200">
        Edit Group Info
      </h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center space-y-4"
      >
        <Input
          {...register('name', { required: 'Group chat name is required' })}
          type="text"
          placeholder="Group chat name"
          className="w-[250px] mx-auto bg-gray-700 rounded-full border-none text-gray-200 text-lg"
        />
        {errors.name && (
          <p className="text-red-500 text-center">
            {typeof errors.name.message === 'string' && errors.name.message}
          </p>
        )}

        <Image
          src={watch('groupPhoto') || chat?.groupPhoto || '/assets/group.png'}
          width={170}
          height={170}
          alt="Profile Picture"
          className="w-[170px] h-[170px] rounded-full object-cover mx-auto"
        />

        <CldUploadButton
          options={{ maxFiles: 1 }}
          uploadPreset="nmkeeg8v"
          onSuccess={handleUploadPfp}
          className="mx-auto text-center text-indigo-400 underline cursor-pointer"
        >
          <p>Upload new profile picture</p>
        </CldUploadButton>

        <div>
          {chat?.members?.map((member, index) => (
            <p key={index}>{member.username}</p>
          ))}
        </div>

        <Button
          type="submit"
          className="w-[250px] mx-auto bg-indigo-500 rounded-full text-lg"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Save changes'}
        </Button>
      </form>
    </div>
  );
};

export default GroupInfo;
