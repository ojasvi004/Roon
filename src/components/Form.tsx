"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface FormProps {
  type: "login" | "register";
}

interface FormData {
  username?: string;
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (type === "register") {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          toast.success("Registration successful!");
          router.push("/");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("An error occurred during registration");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/chats");
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="flex p-32 justify-center h-screen bg-gray-900 ">
      <form className="flex flex-col items-center space-y-4 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-bold mb-4 text-gray-200 font-serif">
          {type === "register" ? "Create Account" : "Sign In"}
        </h1>
        {type === "register" && (
          <div className="w-full">
            <Input
              {...register("username", {
                required: "Username is required",
                validate: (value) =>
                  value.length >= 3 || "Username must be at least 3 characters long",
              })}
              type="text"
              placeholder="Username"
              className="w-full border rounded-full p-2 bg-gray-700 border-none text-white"
            />
            {errors.username && (
              <p className="text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
        )}
        <div className="w-full">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded-full p-2 bg-gray-700 border-none text-white"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full border rounded-full p-2 bg-gray-700 border-none text-white"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full border rounded-full p-2 bg-indigo-500 text-gray-300 hover:bg-indigo-600 border-none"
        >
          {type === "register" ? "Register" : "Login"}
        </button>
        {type === "register" ? (
          <Link href="/">
            <p className="block mt-4 text-gray-400 hover:underline  hover:text-gray-300 text-center">
              Already have an account? Sign in here
            </p>
          </Link>
        ) : (
          <Link href="/register">
            <p className="block mt-4 text-gray-400 hover:underline text-center hover:text-gray-300">
              Don&apos;t have an account? Register here
            </p>
          </Link>
        )}
      </form>
    </div>
  );
};

export default Form;
