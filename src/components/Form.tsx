"use client"
import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { sanitizeInput } from "@/utils/sanitize"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

interface FormProps {
  type: "login" | "register"
}

interface FormData {
  username?: string
  email: string
  password: string
  [key: string]: unknown
}

const Form: React.FC<FormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
        toast.success("Login successful!")
        router.push("/chats")
      } else {
        toast.error("Invalid email or password")
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">
            {type === "register" ? "Create account" : "Sign in"}
          </h1>
          <p className="text-gray-400 text-sm">
            {type === "register"
              ? "Enter your details to create your account"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {type === "register" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Username</label>
              <Input
                {...register("username", {
                  required: "Username is required",
                  validate: (value: unknown) =>
                    (typeof value === "string" && value.length >= 3) || "Username must be at least 3 characters long",
                })}
                type="text"
                placeholder="Enter username"
                className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 transition-colors"
              />
              {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 transition-colors"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 pr-10 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-white text-gray-900 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin"></div>
                {type === "register" ? "Creating account..." : "Signing in..."}
              </>
            ) : (
              <>
                {type === "register" ? "Create account" : "Sign in"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          <div className="pt-4 border-t border-gray-800">
            {type === "register" ? (
              <Link href="/login" className="block text-center">
                <span className="text-gray-400 text-sm">
                  Already have an account? <span className="text-white hover:underline">Sign in</span>
                </span>
              </Link>
            ) : (
              <Link href="/register" className="block text-center">
                <span className="text-gray-400 text-sm">
                  Don&apos;t have an account? <span className="text-white hover:underline">Create one</span>
                </span>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
