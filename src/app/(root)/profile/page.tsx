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
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full p-6">
        <div className="flex-shrink-0 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
              Edit Profile
            </div>
            <p className="text-gray-400">Update your username and profile picture</p>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex-shrink-0">
            <p className="text-red-400 text-center">{errorMessage}</p>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8 w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
              
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="relative">
                    <Image
                      src={watch('profileImage') || user?.profileImage || '/assets/person.jpg'}
                      width={140}
                      height={140}
                      alt="Profile Picture"
                      className="w-40 h-40 rounded-full object-cover border-2 border-gray-600 shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    uploadPreset="nmkeeg8v"
                    onSuccess={handleUploadPfp}
                    className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 rounded-full p-3 shadow-lg transition-colors"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </CldUploadButton>
                </div>
                
                <p className="text-gray-400 text-sm mt-4">Click the camera icon to change your photo</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    validate: (value) =>
                      value.length >= 3 || 'Username must be at least 3 characters',
                  })}
                  type="text"
                  placeholder="Enter your username..."
                  className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12 text-lg"
                />
                {errors.username && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-xs">!</span>
                    {typeof errors.username.message === 'string' && errors.username.message}
                  </p>
                )}
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 rounded-full p-2">
                    <User className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">Account Status</p>
                    <p className="text-xs text-gray-400">Active Member</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
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
    </div>
  );
};

export default Profile;
