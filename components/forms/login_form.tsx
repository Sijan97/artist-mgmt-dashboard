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

import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    const validatedData = formSchema.parse(data);
    const { email, password } = validatedData;

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!res?.error) {
      toast.success("Login Successful");
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error("Invalid Credentials");
    }
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

          <Button className="ml-auto w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href={"/"} className={cn(buttonVariants({ variant: "link" }))}>
            Create one here
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
