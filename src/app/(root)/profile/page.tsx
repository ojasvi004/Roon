'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Loader2, User, Camera, Save, ArrowLeft, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  profileImage: string;
  _id: string;
}

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const router = useRouter();
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
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-400" />
        <p className="text-gray-400">Loading profile...</p>
      </div>
    </div>
  ) : (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="flex-shrink-0 border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Settings</h1>
              <p className="text-sm text-gray-400">Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div className="px-8 py-6 border-b border-gray-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-1">Avatar</h3>
                  <p className="text-sm text-gray-400">A picture helps people recognize you and shows up on your profile</p>
                </div>
                
                <div className="flex items-center gap-4 ml-8">
                  <div className="relative">
                    <Image
                      src={watch('profileImage') || user?.profileImage || '/assets/person.jpg'}
                      width={80}
                      height={80}
                      alt="Profile Picture"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    uploadPreset="nmkeeg8v"
                    onSuccess={handleUploadPfp}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors font-medium"
                  >
                    Change Avatar
                  </CldUploadButton>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-b border-gray-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-1">Display Name</h3>
                  <p className="text-sm text-gray-400">This is how others will see you in chats. You can use special characters and emoji.</p>
                </div>
                
                <div className="flex items-center gap-4 ml-8 min-w-0 flex-1 max-w-md">
                  <Input
                    {...register('username', {
                      required: 'Username is required',
                      validate: (value) =>
                        value.length >= 3 || 'Username must be at least 3 characters',
                    })}
                    type="text"
                    placeholder="Enter your display name..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              {errors.username && (
                <div className="flex justify-end mt-2">
                  <p className="text-red-400 text-sm flex items-center gap-2 max-w-md">
                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-xs">!</span>
                    {typeof errors.username.message === 'string' && errors.username.message}
                  </p>
                </div>
              )}
            </div>

            <div className="px-8 py-8">
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3 h-auto"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25 transition-all px-6 py-3 h-auto"
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
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
