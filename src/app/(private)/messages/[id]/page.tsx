import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";
import { CreateMessage } from "./CreateMessage";
import { DeleteMessage } from "./DeleteMessage";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function MessagesUserPage(props: Props) {
  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const userId = assertAuth();

  const db = createDB();

  const messageUsers = await db
    .with("messageUsers", (db) =>
      db
        .selectFrom("messages")
        .select((eb) => [
          "toUserId as userId",
          eb.fn.max("createdAt").as("maxCreatedAt"),
        ])
        .where("fromUserId", "=", userId)
        .groupBy(["fromUserId", "toUserId"])
        .union(
          db
            .selectFrom("messages")
            .select((eb) => [
              "fromUserId as userId",
              eb.fn.max("createdAt").as("maxCreatedAt"),
            ])
            .where("toUserId", "=", userId)
            .groupBy(["fromUserId", "toUserId"])
        )
    )
    .selectFrom("messageUsers")
    .innerJoin("users", "messageUsers.userId", "users.id")
    .select((eb) => [
      "users.id",
      "users.username",
      "users.displayName",
      eb.fn.max("maxCreatedAt").as("maxCreatedAt"),
    ])
    .groupBy(["users.id", "users.username", "users.displayName"])
    .orderBy((eb) => eb.fn.max("maxCreatedAt"), "desc")
    .execute();

  const messages = await db
    .selectFrom("messages")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb.and([eb("fromUserId", "=", userId), eb("toUserId", "=", id)]),
        eb.and([eb("toUserId", "=", userId), eb("fromUserId", "=", id)]),
      ])
    )
    .orderBy("createdAt", "asc")
    .execute();

  const users1 = await db.selectFrom("users").select("id").execute();

  let userarr1: Array<number> = [];
  for (let i = 1; i <= users1.length; i++) {
    userarr1.push(i);
  }
  let userarr2 = userarr1.slice();
  let pairs: Array<any> = [];
  for (let i = 0; i <= userarr1.length; i++) {
    userarr2.splice(0, 1);
    for (let j = 0; j < userarr2.length; j++) {
      pairs.push([userarr1[i], userarr2[j]]);
    }
  }

  return (
    <div className="flex flex-row -mt-20">
      <div className="card bg-base-100 drop-shadow-md max-h-screen overflow-y-auto overflow-x-hidden">
        <div className="card-body">
          Message
          <div>
            {messageUsers.map((r) => (
              <Link key={r.id} href={`/messages/${r.id}`}>
                <div className="w-96 flex flex-row items-center m-2 p-2 space-x-4 hover:bg-gray-200">
                  <div>{r.id}</div>
                  <div className="flex flex-col">
                    <div>{r.displayName ?? r.username}</div>
                    <div>{new Date(r.maxCreatedAt).toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="card bg-base-100 drop-shadow-md max-h-screen overflow-y-auto">
          <div className="card-body">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat ${
                  m.fromUserId === userId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header">
                  skibidi
                  <time className="text-xs opacity-50">
                    {" "}
                    {new Date(m.createdAt).toLocaleString().slice(0, -3)}
                  </time>
                </div>
                <div
                  className={`chat-bubble ${
                    m.fromUserId === userId
                      ? "chat-bubble-primary"
                      : "chat-bubble-accent"
                  }`}
                >
                  {m.message}
                </div>
                <div className="chat-footer">
                  {m.fromUserId === userId ? (
                    <DeleteMessage id={m.id} toId={m.toUserId}></DeleteMessage>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <CreateMessage id={id}></CreateMessage>
      </div>
    </div>
  );
}
