"use server";

import { createDB } from "../../../../lib/db";
import { revalidatePath } from "next/cache";

export async function editPost(postId: number, content: string) {
  console.log(`Editing post with id: ${postId}, with content: ${content}`);

  const db = createDB();

  await db
    .updateTable("posts")
    .set({ content: content })
    .where("id", "=", postId)
    .execute();

  revalidatePath(`/post/${postId}/edit`);
}
