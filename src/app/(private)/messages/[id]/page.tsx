import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";
import { CreateMessage } from "./CreateMessage";
import { DeleteMessage } from "./DeleteMessage";

type Props = { params: { id: string } };

export default async function MessagesUserPage(props: Props) {
  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const userId = assertAuth();

  const db = createDB();

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

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
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
        <CreateMessage id={id}></CreateMessage>
      </div>
    </div>
  );
}
