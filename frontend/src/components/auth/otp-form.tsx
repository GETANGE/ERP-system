"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/hooks/use-toast"
import CardWrapper from "./card-wrapper"
import { Input } from "../ui/input"
import { Lock } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "@/api/api"
import { useNavigate } from "react-router"
import { useState } from "react"

const FormSchema = z.object({
  pin: z.string().min(5, {
    message: "Your one-time password must be 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be of 6 characters long"
  })
})

export function InputOTPForm() {
  const [loading, setLoading]= useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      password: ""
    },
  })

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess:(data)=>{
      console.log(`reset-password submitted ${data}`)
    }
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    mutation.mutate(data);
    navigate('/login')

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <CardWrapper
      label="Input your OTP token here"
      title="One-Time Password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 justify-center w-full">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel> One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full flex justify-between gap-2">
                      {[...Array(5)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="flex-1 text-center border border-gray-300 rounded-md text-gray-950"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">
                  <Lock className="inline mr-2 text-gray-500" />New Password
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">{loading ? "Loading..." : "ResetPassword"}</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}