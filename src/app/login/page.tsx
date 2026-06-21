"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import Link from "next/link"
import { loginUser } from "./actions"
import { useActionState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, undefined)
  
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-md p-6">
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center justify-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl">
            <Sparkles className="h-6 w-6 text-black" />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white">Welcome back</h1>
          <p className="text-sm text-zinc-400">Enter your credentials to continue</p>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl transition-all">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="rounded-xl bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 border border-red-500/20">
                {state.error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="h-12 rounded-xl border-white/10 bg-black px-4 text-white placeholder:text-zinc-600 focus-visible:border-white/50 focus-visible:ring-1 focus-visible:ring-white/50"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="h-12 rounded-xl border-white/10 bg-black px-4 text-white placeholder:text-zinc-600 focus-visible:border-white/50 focus-visible:ring-1 focus-visible:ring-white/50"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-medium text-base" 
              disabled={isPending}
            >
              <span className="flex items-center justify-center gap-2">
                {isPending ? "Authenticating..." : "Sign In"}
                {!isPending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </span>
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          New to the platform?{" "}
          <Link href="/signup" className="font-medium text-white hover:text-zinc-300 hover:underline transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
