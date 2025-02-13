import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    username: z.string().min(1, {
        message: "Please enter your name"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password confirm must be atleast 6 characters long"
    }),
    phoneNumber: z.string().min(10,{
        message:"Phone number must atleast be of 10 characters long"
    })
})
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters long"
    }),
})

export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
})