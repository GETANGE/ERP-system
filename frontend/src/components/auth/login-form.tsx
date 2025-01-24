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
import { LoginSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm({
        resolver: zodResolver(LoginSchema), defaultValues: {
          email:"",
          password:""
        }
  })

  const onsubmit = (data:z.infer<typeof LoginSchema>) => {
    // send to the database
    console.log('Submitted', data);
  }

  return (
    <CardWrapper
        label="Sign in here"
        title="Login"
        backButtonHref={() => navigate('/login')}
        backButtonLabel="Don't have an account ?"
    >
        {/* contains all the elements to be displayed in the card{children} */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 ">
              <div className="space-y-4">
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
              </div>
              <Button className="w-full  bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md" type="submit">Login</Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm;