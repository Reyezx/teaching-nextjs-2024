"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function deleteMessage(
  mId: number,
  toId: number
) {
  const userId = assertAuth();

  const db = createDB();

  await db
    .deleteFrom("messages")
    .where("id", "=", mId)
    .execute()


  redirect(`/messages/${toId}`)
}
