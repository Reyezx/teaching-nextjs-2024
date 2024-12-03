import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../../lib/db-types";
import { dialect } from "../../../../lib/db";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function PostDetail(props: Props) {
  console.log(props.params.id);

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const id = parseInt(props.params.id);

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .where("posts.userId", "=", id)
    .orderBy("createdAt")
    .execute();

  if (posts == null) {
    return <div>Error: Post not found</div>;
  }

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <Link href={`/post/${p.id}`}>
            <div className="card-body">
              <p>{p.content}</p>
              <p>{p.userId}</p>
              <p>{new Date(p.createdAt).toString()}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
