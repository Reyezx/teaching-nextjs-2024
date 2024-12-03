import { createDB } from "../../../../lib/db";
import { EditPostForm } from "./EditPostForm";
<<<<<<< HEAD
import { DeletePostButton } from "./DeleteButton";
=======
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5

type Props = { params: { id: string } };

export default async function EditPostPage(props: Props) {
<<<<<<< HEAD
  console.log("Editing post with id:", props.params.id);
=======
  console.log("Edit post page:", props.params.id);
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const db = createDB();

  const post = await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (post == null) {
    return <div>Error: Post not found</div>;
  }

  console.log(post);

<<<<<<< HEAD
  // --------

=======
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5
  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <EditPostForm id={post.id} content={post.content} />
<<<<<<< HEAD
        <DeletePostButton id={post.id}></DeletePostButton>
=======
>>>>>>> 6436d157880b91c367a5681aa84670c7e63b35b5
      </div>
    </div>
  );
}
