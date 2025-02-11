"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function createMessage(
  newMessage: string,
  toId: number
) {
  const userId = assertAuth();

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  await db
    .insertInto("messages")
    .values({ message: newMessage, toUserId: toId, fromUserId: userId, createdAt: Date.now() })
    .execute();

  redirect(`/messages/${toId}`)
}
