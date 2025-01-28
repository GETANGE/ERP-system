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
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/api/api";
import { User, Mail, Lock, Phone } from "lucide-react";

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
        },
    });

    const mutation = useMutation({
        mutationFn: Register,
        onSuccess: (data) => {
            console.log(`Data submitted successfully`, data);
            setLoading(false);
            navigate("/login");
        },
        onError: (error) => {
            console.error(`Error submitting data: ${error}`);
            setLoading(false);
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true);
        mutation.mutate(data);
    };

    return (
        <CardWrapper
            label="Create an account"
            title="Register"
            backButtonHref={() => navigate("/login")}
            backButtonLabel="Already have an account?"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-500 tracking-wide lg:text-xl flex items-center gap-2">
                                        <User className="h-5 w-5 text-gray-700" />
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="John Doe" className="border border-none bg-slate-100 text-gray-950" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-500 tracking-wide lg:text-xl flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-gray-700" />
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="johndoe@gmail.com" className="border border-none bg-slate-100 text-gray-950" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-500 tracking-wide lg:text-xl flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-gray-700" />
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-500 tracking-wide lg:text-xl flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-gray-700" />
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-500 tracking-wide lg:text-xl flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-gray-700" />
                                        Phone Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="+254 ..." className="border border-none bg-slate-100 text-gray-950" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md" type="submit">
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;