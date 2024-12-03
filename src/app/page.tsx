import { createDB } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const db = createDB();

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <div className="card-body">
            <Link href={`/post/${p.id}`}>
              <p>{p.content}</p>
              <p>{p.userId}</p>
              <p>{new Date(p.createdAt).toString()}</p>
<<<<<<< HEAD
            </div>
          </Link>
=======
            </Link>
            <Link href={`/user/${p.userId}`}>
              {p.userId}
              {p.userId === 1 ? " *" : ""}
            </Link>
          </div>
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5
        </div>
      ))}
    </div>
  );
}
