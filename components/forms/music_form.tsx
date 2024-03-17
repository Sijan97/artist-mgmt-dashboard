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
// import Select from "react-select";
import { Artist } from "@/app/(dashboard)/dashboard/artists/core";
import { toast } from "react-toastify";
import {
  Music,
  createMusic,
  musicSchema,
  updateMusic,
} from "@/app/(dashboard)/dashboard/musics/core";
import _ from "lodash";

type MusicFormValue = z.infer<typeof musicSchema>;

interface MusicFormProps {
  initialData: Music | null;
  artists: Artist[];
}

export const MusicForm: React.FC<MusicFormProps> = ({
  initialData,
  artists,
}) => {
  const defaultFormData: MusicFormValue = {
    title: "",
    album_name: "",
    genre: "",
    release_date: new Date(),
    artist_ids: "",
  };

  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MusicFormValue>(defaultFormData);
  const title = initialData ? "Edit music" : "Create music";
  const description = initialData ? "Edit music." : "Add a new music";
  const toastMessage = initialData ? "Music updated." : "Music created.";
  const action = initialData ? "Save changes" : "Create";

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
  const artistChangeHandler = (value: string) => {
    setFormData({ ...formData, artist_ids: value });
  };

  const onSubmit = async () => {
    const validatedData = musicSchema.parse(formData);
    console.log(validatedData);
    try {
      setLoading(true);

      if (initialData) {
        updateMusic(
          initialData.id,
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
      router.push(`/dashboard/musics`);
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

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <Select
                    name="artist_ids"
                    disabled={loading}
                    onValueChange={artistChangeHandler}
                    value={formData?.artist_ids}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an artist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {artists &&
                        artists.map((artist) => (
                          <SelectItem key={artist.id} value={artist.id}>
                            {artist.name}
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
