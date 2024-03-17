"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "../common/ui/Spinner";

import GithubSignInButton from "../github_action_button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match.",
    path: ["confirm_password"],
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserRegisterForm() {
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
    confirm_password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    const validatedData = formSchema.parse(data);

    const response = await axios({
      url: process.env.NEXT_PUBLIC_HOST + "users/user_register/",
      method: "POST",
      data: validatedData,
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        toast.success("Registered Succesfully");
        router.push("/login");
      })
      .catch((error: AxiosError) => {
        const error_data = error.response?.data as { message: string };
        toast.error(`${error_data.message}`);
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    // disabled={isLoading}
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter strong password"
                    // disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    // disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Login here
          </Link>
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
