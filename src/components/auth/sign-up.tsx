"use client"

import type { SignUpSchema } from "@/modules/users/schemas"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils"
import { signUpSchema } from "@/modules/users/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  function onSubmit(data: SignUpSchema) {
    if (!isTermsChecked) {
      // eslint-disable-next-line no-alert
      alert("[ERROR]: You must accept terms and conditions")
      return
    }
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <div className="mx-auto w-full max-w-[400px] border px-8 py-9">
      <div>
        <h2 className="font-bold">Sign up</h2>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 grid grid-cols-1 gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      variant={errors.email ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="you@email.com"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      variant={errors.password ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="Enter your password..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sign-up-terms"
              disabled={isSubmitting}
              checked={isTermsChecked}
              onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
            />
            <Label
              htmlFor="sign-up-terms"
              className={cn(
                "text-[13px] font-medium peer-disabled:cursor-not-allowed",
                isSubmitting && "text-gray-400",
              )}
            >
              Accept terms and conditions
            </Label>
          </div>
          <div>
            <Button type="submit" size="md" className="w-full">Create Account</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
