'use client'

import { useNavigate } from "react-router";
import CardWrapper from "./card-wrapper";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/api/api";


const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
        resolver: zodResolver(RegisterSchema), defaultValues: {
          email:"",
          username:"",
          password:"",
          confirmPassword:"",
          phoneNumber:""
        }
  })

  const mutation = useMutation({
        mutationFn: Register,
        onSuccess:(data)=>{
            console.log(`Data submitted successfully,`, data)
            setLoading(false);
            navigate("/login")
        },
        onError: (error)=>{
            console.log(`Error submitting data: ${error}`)
        }
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>)=>{
    setLoading(true);
    mutation.mutate(data)
  }

  return (
    <CardWrapper
        label="Create an account"
        title="Register"
        backButtonHref={() => navigate('/login')}
        backButtonLabel="Already have an account ?"
    >
        {/* contains all the elements to be displayed in the card{children} */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="space-y-4">
                  <FormField 
                      control={form.control}
                      name='username'
                      render = {({field }) => (
                          <FormItem>
                              <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">Username</FormLabel>
                              <FormControl>
                                  <Input {...field} type="text" placeholder="John Doe" className="border border-none bg-slate-100 text-gray-950"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={form.control}
                      name='email'
                      render = {({field }) => (
                          <FormItem>
                              <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">Email</FormLabel>
                              <FormControl>
                                  <Input {...field} type="email" placeholder="johndoe@gmail.com" className="border border-none bg-slate-100 text-gray-950"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={form.control}
                      name='password'
                      render = {({field }) => (
                          <FormItem>
                              <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">Password</FormLabel>
                              <FormControl>
                                  <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField 
                      control={form.control}
                      name='confirmPassword'
                      render = {({field }) => (
                          <FormItem>
                              <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">Confirm Password</FormLabel>
                              <FormControl>
                                  <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                <FormField 
                      control={form.control}
                      name='phoneNumber'
                      render = {({field }) => (
                          <FormItem>
                              <FormLabel className="text-neutral-500 tracking-wide lg:text-xl">Phone Number</FormLabel>
                              <FormControl>
                                  <Input {...field} type="string" placeholder="+254 .. .. .. .." className="border border-none bg-slate-100 text-gray-950"/>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <Button className="w-full  bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md" type="submit">
                {loading ? "Loading...":"Register"}
              </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm;