"use client";

import { useForm } from "react-hook-form";
import { editPost } from "./edit-post-action";

type Props = { id: number; content: string };

type FormValues = { content: string };

export function EditPostForm(props: Props) {
  console.log("im over here editing my shit", props);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { content: props.content },
  });

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await editPost(props.id, data.content)
        window.location.href = "/post/" + props.id
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input className="btn btn-sm btn-outline" type="submit" value="Update" />
    </form>
  );
}