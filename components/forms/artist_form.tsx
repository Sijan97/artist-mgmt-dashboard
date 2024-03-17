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
import { Heading } from "../ui/heading";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { AlertModal } from "../modal/alert-modal";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Artist,
  artistSchema,
  createArtist,
  updateArtist,
} from "@/app/(dashboard)/dashboard/artists/core";
import { toast } from "react-toastify";

type ArtistFormValue = z.infer<typeof artistSchema>;

interface ArtistFormProps {
  initialData: Artist | null;
}

export const ArtistForm: React.FC<ArtistFormProps> = ({ initialData }) => {
  const defaultFormData: ArtistFormValue = {
    name: "",
    first_release_year: 0,
    no_of_albums_released: 0,
    date_of_birth: new Date(),
    gender: "",
    address: "",
  };

  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArtistFormValue>(defaultFormData);
  const title = initialData ? "Edit artist" : "Create artist";
  const description = initialData ? "Edit artist." : "Add a new artist";
  const toastMessage = initialData ? "Artist updated." : "Artist created.";
  const action = initialData ? "Save changes" : "Create";

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const form = useForm<ArtistFormValue>({
    resolver: zodResolver(artistSchema),
    defaultValues: formData || {},
  });

  const changeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const selectChangeHandler = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const onSubmit = async () => {
    const validatedData = artistSchema.parse(formData);
    try {
      setLoading(true);

      if (initialData) {
        updateArtist(
          initialData.id,
          validatedData,
          () => toast.success(toastMessage),
          () => toast.error("Failed to update"),
          session.data?.user.token as string
        );
      } else {
        console.log(validatedData);
        createArtist(
          formData,
          () => toast.success(toastMessage),
          () => toast.error("Failed to create"),
          session.data?.user.token as string
        );
      }

      router.refresh();
      router.push(`/dashboard/artists`);
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      name="name"
                      disabled={loading}
                      placeholder="Name"
                      value={formData?.name}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_release_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Release Year</FormLabel>
                  <FormControl>
                    <Input
                      name="first_release_year"
                      type="number"
                      disabled={loading}
                      placeholder="First Release Year"
                      value={formData?.first_release_year}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_of_albums_released"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Albums Released</FormLabel>
                  <FormControl>
                    <Input
                      name="no_of_albums_released"
                      type="number"
                      disabled={loading}
                      placeholder="No of Albums Released"
                      value={formData?.no_of_albums_released}
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
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
