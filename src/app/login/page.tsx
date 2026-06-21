"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { loginUser } from "./actions"
import { useActionState } from "react"
import { ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, undefined)

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#FBFAF6] dark:bg-[#191A1A] px-6">
      {/* faint dot-grid texture, Perplexity-style */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #19191708 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 w-full max-w-[380px]">
        {/* Mark */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#20808D]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FBFAF6]" />
          </div>
          <h1 className="text-[28px] leading-tight text-[#191A1A] dark:text-[#F5F4ED]">
            Welcome <span className="font-serif italic font-normal">back</span>
          </h1>
          <p className="mt-2 text-[14px] text-[#6B6B64] dark:text-[#9B9A8F]">
            Sign in to pick up where you left off
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E4E1D8] dark:border-[#33322E] bg-white dark:bg-[#1F1F1D] p-7 shadow-[0_1px_2px_rgba(25,25,23,0.04)]">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-3 py-2.5 text-center text-[13px] font-medium text-red-600 dark:text-red-400">
                {state.error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-[12px] font-medium text-[#6B6B64] dark:text-[#9B9A8F]"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="h-11 rounded-lg border-[#E4E1D8] dark:border-[#33322E] bg-[#FBFAF6] dark:bg-[#191A1A] px-3.5 text-[14px] text-[#191A1A] dark:text-[#F5F4ED] placeholder:text-[#A8A69B] focus-visible:border-[#20808D] focus-visible:ring-1 focus-visible:ring-[#20808D]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[12px] font-medium text-[#6B6B64] dark:text-[#9B9A8F]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[12px] font-medium text-[#20808D] hover:text-[#18656F] transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-11 rounded-lg border-[#E4E1D8] dark:border-[#33322E] bg-[#FBFAF6] dark:bg-[#191A1A] px-3.5 text-[14px] text-[#191A1A] dark:text-[#F5F4ED] placeholder:text-[#A8A69B] focus-visible:border-[#20808D] focus-visible:ring-1 focus-visible:ring-[#20808D]"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="group h-11 w-full rounded-lg bg-[#20808D] hover:bg-[#18656F] text-white text-[14px] font-medium transition-colors"
              disabled={isPending}
            >
              <span className="flex items-center justify-center gap-1.5">
                {isPending ? "Signing in..." : "Sign in"}
                {!isPending && (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </span>
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-[13px] text-[#6B6B64] dark:text-[#9B9A8F]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#20808D] hover:text-[#18656F] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}