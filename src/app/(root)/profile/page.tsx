"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { Loader2 } from "lucide-react";

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
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        profileImage: user.profileImage,
      });
    }
    setLoading(false);
  }, [user, reset]);

  const handleUploadPfp = (result: any) => {
    setValue("profileImage", result?.info?.secure_url);
  };

  const onSubmit = async (data) => {
    if (!user) {
      setErrorMessage("user session is not available");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        console.log("error:", errorResponse);
        throw new Error("failed to update profile");
      }

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(data);
      setErrorMessage("error occurred while updating");
      setLoading(false);
    }
  };

  return loading ? (
    <div>
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <div>
      <h1>Edit your profile</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          {...register("username", {
            required: "Username is required",
            validate: (value) =>
              value.length >= 3 || "Username must be at least 3 characters",
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <Image
          src={
            watch("profileImage") || user?.profileImage || "/assets/person.jpg"
          }
          width={40}
          height={40}
          alt="Profile Picture"
        />

        <CldUploadButton
          options={{ maxFiles: 1 }}
          uploadPreset="nmkeeg8v"
          onSuccess={handleUploadPfp}
        >
          <p>Upload new profile picture</p>
        </CldUploadButton>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
};

export default Profile;
