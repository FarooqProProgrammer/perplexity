"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import Link from "next/link"
import { registerUser } from "./actions"
import { useActionState } from "react"

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(registerUser, undefined)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            {state?.error && (
              <div className="text-sm font-medium text-red-500 dark:text-red-400">
                {state.error}
              </div>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldContent>
                <Input id="password" name="password" type="password" required />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <FieldContent>
                <Input id="confirm-password" name="confirm-password" type="password" required />
              </FieldContent>
            </Field>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

