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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      } else {
        toast.error("something went wrong");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/chats");
      } else {
        toast.error("invalid email or password");
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {type === "register" && (
        <div>
          <Input
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "username must be at least 3 characters long";
                }
              },
            })}
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
      )}
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "email is required" })}
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}
      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: "password is required" })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <button type="submit">
        {type === "register" ? "Register" : "Login"}
      </button>
      {type === "register" ? (
        <Link href="/">
          <p>Already have an account? Sign in here</p>
        </Link>
      ) : (
        <Link href="/register">
          <p>Don&apos;t have an account? Register here</p>
        </Link>
      )}
    </form>
  );
};

export default Form;
