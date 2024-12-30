'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Loader from '@/components/Loader';

interface User {
  username: string;
  profileImage: string;
  _id: string;
}

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        profileImage: user.profileImage,
      });
    }
    setLoading(false);
  }, [user, reset]);

  const handleUploadPfp = (result: CloudinaryUploadWidgetResults) => {
    const secureUrl = typeof result.info === 'string' ? result.info : result.info?.secure_url;
    setValue('profileImage', secureUrl);
  };

  const onSubmit = async (data) => {
    if (!user) {
      setErrorMessage('session not found');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        console.log('Error:', errorResponse);
        throw new Error('failed to update');
      }

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage('error updating profile');
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-3xl text-center mb-7 text-gray-200">
        Edit your profile
      </h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center space-y-4"
      >
        <Input
          {...register('username', {
            required: 'Username is required',
            validate: (value) =>
              value.length >= 3 || 'Username must be at least 3 characters',
          })}
          type="text"
          placeholder="Username"
          className="w-[250px] mx-auto bg-gray-700 rounded-full border-none text-gray-200 text-lg"
        />
      

        <Image
          src={
            watch('profileImage') || user?.profileImage || '/assets/person.jpg'
          }
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

        <Button
          type="submit"
          className="w-[250px] mx-auto bg-indigo-500 rounded-full text-lg"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
