import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";
import { DB } from "../src/lib/db-types";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("comments").execute();
  await db.deleteFrom("posts").execute();
  await db.deleteFrom("users").execute();

  const numberOfUsers = 20;

  const users = [];

  const myUser = await db
    .insertInto("users")
    .values({
      id: 1,
      username: faker.internet.userName(),
      // email: faker.internet.email(),
      email: "admin@social.com",
      password: 'abc123',
      displayName: faker.internet.displayName(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  users.push(myUser);

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await db
      .insertInto("users")
      .values({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        displayName: faker.internet.displayName(),
        password: faker.internet.password(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    users.push(user);
  }

  const posts = [];
  for (const user of users) {
    const numberOfPosts = faker.number.int({ min: 0, max: 20 });

    for (let i = 0; i < numberOfPosts; i++) {
      const post = await db
        .insertInto("posts")
        .values({
          userId: user.id,
          content: faker.lorem.sentences(2),
          createdAt: faker.date.recent({ days: 10 }).getTime(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      posts.push(post);
    }
  }

  for (const post of posts) {
    for (const user of users) {
      const shouldCreateComment = faker.datatype.boolean(0.1);

      if (shouldCreateComment) {
        await db
          .insertInto("comments")
          .values({
            userId: user.id,
            postId: post.id,
            content: faker.lorem.sentences(2),
            createdAt: faker.date
              .between({ from: new Date(post.createdAt), to: new Date() })
              .getTime(),
          })
          .execute();
      }
    }
  }
}
