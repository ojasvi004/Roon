"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { sanitizeInput } from "@/utils/sanitize"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PostLoginLoader from "@/components/PostLoginLoader"

interface FormProps {
  type: "login" | "register"
}

interface FormData {
  username?: string
  email: string
  password: string
  [key: string]: unknown
}

export default function AuthForm({ type }: FormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const sanitizedData = sanitizeInput(data)

    if (type === "register") {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        })
        if (res.ok) {
          toast.success("Registration successful!")
          router.push("/")
        } else {
          toast.error("Something went wrong")
        }
      } catch (error) {
        console.log(error)
        toast.error("An error occurred during registration")
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...sanitizedData,
        redirect: false,
      })
      if (res?.ok) {
        sessionStorage.setItem("justLoggedIn", "true")
        setIsRedirecting(true)
        toast.success("Login successful!")
        router.replace("/chats")
      } else {
        toast.error("Invalid email or password")
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative z-10">
      {isRedirecting && <PostLoginLoader />}
      <Card className="mx-auto w-full max-w-lg bg-zinc-800/60 backdrop-blur-lg border-zinc-600/70 shadow-2xl shadow-black/50">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-3xl text-zinc-200 text-center">{type === "register" ? "Create Account" : "Sign In"}</CardTitle>
          <CardDescription className="text-zinc-400 text-center text-base">
            {type === "register"
              ? "Enter your information to create an account"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {type === "register" && (
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-zinc-300 text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    validate: (value: unknown) =>
                      (typeof value === "string" && value.length >= 3) || "Username must be at least 3 characters long",
                  })}
                  className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 h-12 text-base"
                />
                {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
              </div>
            )}

            <div className="grid gap-3">
              <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 h-12 text-base"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">
                  Password
                </Label>
                {type === "login" && (
                  <Link href="#" className="ml-auto inline-block text-sm text-indigo-400 hover:text-indigo-300">
                    Forgot your password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 pr-12 h-12 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white h-12 text-base font-medium mt-2" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {type === "register" ? "Creating..." : "Signing in..."}
                </div>
              ) : type === "register" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            {type === "register" ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
