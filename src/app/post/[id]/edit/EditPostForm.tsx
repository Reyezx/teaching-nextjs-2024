"use client";

import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { editPost } from "./edit-post-action";

type Props = { id: number; content: string };

type FormValues = { content: string };

export function EditPostForm(props: Props) {
  console.log("im over here editing my shit", props);

=======
import { updatePost } from "./update-post-action";

type Props = {
  id: number;
  content: string;
};

type FormValues = {
  content: string;
};

export function EditPostForm(props: Props) {
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { content: props.content },
  });

  return (
    <form
      className="grid grid-cols-1"
<<<<<<< HEAD
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await editPost(props.id, data.content)
        window.location.href = "/post/" + props.id
=======
      onSubmit={handleSubmit((data) => {
        console.log(data);
        updatePost(props.id, data.content);
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5
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
