import { useForm } from "react-hook-form"
import CardWrapper from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/schema"
import { z } from "zod"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "@/api/api"

const ForgotPassword = () => {
    const [loading, setLoading]= useState(false);

    const form = useForm({
        resolver:zodResolver(ForgotPasswordSchema), defaultValues: {
            email:""
        }
    })

    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess:(data)=>{
            console.log(`Email sent ${data}`)
        }
    })
    const onSubmit = (data:z.infer<typeof ForgotPasswordSchema>)=>{
        console.log(data);
        mutation.mutate(data)
        setLoading(true)
    }
    
  return (
    <CardWrapper
        label="Input your email here"
        title="ForgotPassword"
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
              </div>
              <Button className="w-full  bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md" type="submit">{loading ? "Loading..." : "ForgotPassword"}</Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default ForgotPassword