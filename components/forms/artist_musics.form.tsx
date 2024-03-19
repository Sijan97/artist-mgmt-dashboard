"use client";

import { useEffect, useState } from "react";

import _ from "lodash";
import * as z from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createMusic,
  Music,
  musicSchema,
  updateMusic,
} from "@/app/(dashboard)/dashboard/musics/core";

import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type MusicFormValue = z.infer<typeof musicSchema>;

interface MusicFormProps {
  initial_data: Music | null;
  artist_id: string;
}

export const ArtistMusicForm: React.FC<MusicFormProps> = ({
  initial_data,
  artist_id,
}) => {
  const defaultFormData: MusicFormValue = {
    title: "",
    album_name: "",
    genre: "",
    release_date: new Date(),
    artist_ids: [artist_id],
  };

  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MusicFormValue>(defaultFormData);
  const title = initial_data ? "Edit music" : "Create music";
  const description = initial_data ? "Edit music." : "Add a new music";
  const toastMessage = initial_data ? "Music updated." : "Music created.";
  const action = initial_data ? "Save changes" : "Create";

  useEffect(() => {
    if (initial_data) {
      //@ts-ignore
      setFormData(initial_data);
    }
  }, [initial_data]);

  const form = useForm<MusicFormValue>({
    resolver: zodResolver(musicSchema),
    defaultValues: formData || {},
  });

  const changeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const genres = ["rnb", "country", "classic", "rock", "jazz", "pop"];
  const genreChangeHandler = (value: string) => {
    setFormData({ ...formData, genre: value });
  };

  const onSubmit = async () => {
    const validatedData = musicSchema.parse(formData);
    try {
      setLoading(true);

      if (initial_data) {
        updateMusic(
          initial_data.id,
          validatedData,
          () => toast.success(toastMessage),
          () => toast.error("Failed to update"),
          session.data?.user.token as string
        );
      } else {
        createMusic(
          validatedData,
          () => toast.success(toastMessage),
          () => toast.error("Failed to create"),
          session.data?.user.token as string
        );
      }

      router.refresh();
      router.push(`/dashboard/artists/${artist_id}/musics`);
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <p
          onClick={() => {
            console.log(form.getValues());
          }}
        >
          Hello
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      name="title"
                      type="text"
                      disabled={loading}
                      placeholder="Title"
                      value={formData?.title}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="album_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input
                      name="album_name"
                      type="text"
                      disabled={loading}
                      placeholder="Album Name"
                      value={formData?.album_name}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="release_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Date</FormLabel>
                  <FormControl>
                    <Input
                      name="release_date"
                      className="w-1/3"
                      type="date"
                      disabled={loading}
                      //@ts-ignore
                      value={formData?.release_date}
                      onChange={changeHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    name="genre"
                    disabled={loading}
                    onValueChange={genreChangeHandler}
                    value={formData?.genre}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
