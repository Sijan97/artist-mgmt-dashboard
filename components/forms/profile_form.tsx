"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  UserProfile,
  profileSchema,
  updateProfile,
} from "@/app/(dashboard)/dashboard/profile/core";
import { Heading } from "../ui/heading";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "react-toastify";

type ProfileFormValue = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData: UserProfile | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormValue | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const form = useForm<ProfileFormValue>({
    resolver: zodResolver(profileSchema),
    defaultValues: formData || {},
  });

  const changeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const selectChangeHandler = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const onSubmit = async () => {
    const validatedData = profileSchema.parse(formData);
    try {
      setLoading(true);

      if (initialData) {
        updateProfile(
          initialData.id,
          validatedData,
          () => toast.success("Profile Updated"),
          () => toast.error("Failed to Update"),
          session.data?.user.token as string
        );
      }

      router.refresh();
      router.push(`/dashboard/profile`);
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Edit profile" description="Edit profile data." />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      name="first_name"
                      disabled={loading}
                      placeholder="First Name"
                      value={formData?.first_name}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      name="last_name"
                      type="text"
                      disabled={loading}
                      placeholder="Last Name"
                      value={formData?.last_name}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      name="phone"
                      type="text"
                      disabled={loading}
                      placeholder="Phone Number"
                      value={formData?.phone}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      name="date_of_birth"
                      className="w-1/3"
                      type="date"
                      disabled={loading}
                      //@ts-ignore
                      value={formData?.date_of_birth}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    disabled={loading}
                    onValueChange={selectChangeHandler}
                    value={formData?.gender}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="male" value="male">
                        Male
                      </SelectItem>
                      <SelectItem key="female" value="female">
                        Female
                      </SelectItem>
                      <SelectItem key="others" value="others">
                        Others
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      name="address"
                      type="text"
                      disabled={loading}
                      value={formData?.address}
                      onChange={changeHandler}
                      placeholder="Enter Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};
