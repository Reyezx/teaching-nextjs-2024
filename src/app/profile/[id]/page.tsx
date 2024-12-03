import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types";
import { dialect } from "../../../lib/db";

type Props = {
  params: { id: string };
};

export default async function UserProfile(props: Props) {
  console.log(props.params.id);

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const id = parseInt(props.params.id);

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>{user?.username}</p>
        <p>{user?.displayName}</p>
        <p>{user?.email}</p>
        <p>{user?.id}</p>
        <a href={`/profile/posts/${user?.id}`}>View posts</a>
      </div>
    </div>
  );
}
