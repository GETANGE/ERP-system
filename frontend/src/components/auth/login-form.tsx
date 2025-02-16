import { useNavigate } from "react-router";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/api/api";
import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast"

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Mutation function for login
    const mutation = useMutation({
        mutationFn: Login,
        onSuccess: (data) => {
            console.log("Logged in successfully", data);

            setTimeout(() => {
                setLoading(false);
                navigate("/sidebar"); // Only navigate on success
            }, 500);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        
            const errorMessage = error?.message || "Something went wrong. Please try again.";
        
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: errorMessage
            });

        
            setTimeout(() => {
                setLoading(false);
            }, 500);
        },        
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        mutation.mutate(data);
        console.log("Submitted", data);
    };

    return (
        <CardWrapper
            label="Sign in here"
            title="Login"
            backButtonHref={() => navigate('/register')}
            backButtonLabel="Don't have an account?"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
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
                                        <Input {...field} type="email" placeholder="johndoe@gmail.com" className="border border-none bg-slate-100 text-gray-950"/>
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
                                        <Input {...field} type="password" placeholder="******" className="border border-none bg-slate-100 text-gray-950"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md flex items-center justify-center"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin h-5 w-5 text-white" /> : "Login"}
                    </Button>
                    <p 
                        className="text-black hover:cursor-pointer hover:underline"
                        onClick={() => navigate('/forgotpassword')}
                    >
                        Forgot password?
                    </p>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;