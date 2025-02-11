"use client";

import { useForm } from "react-hook-form";
import { createMessage } from "./create-message-action";

type Props = {
  id: number;
};

interface FormValues {
  newMessage: string;
  id: number;
}


export function CreateMessage(props: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { id: props.id },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        var box = document.querySelector("input")
        box!.value = ""
        createMessage(data.newMessage, props.id)
      })}
    >
      <input {...register("newMessage")} id="messagearea" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </form>
  );
}
