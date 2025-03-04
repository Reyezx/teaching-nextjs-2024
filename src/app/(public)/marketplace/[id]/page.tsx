import { createDB } from "../../../../lib/db";

type Props = { params: { id: string } };

export default async function ItemDetail(props: Props) {
  const id = parseInt(props.params.id);

  const db = createDB();

  const item = await db
    .selectFrom("marketplace")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (item == null) {
    return <div>Error: item not found</div>;
  }

  return (
    <div key={item.id} className="card drop-shadow-lg compact bg-stone-100">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{item.name}</h2>
          <p className="text-sm text-gray-500 text-right">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-bold text-stone-600 ring-stone-200 text-left ring-2 rounded-lg px-2">
            {item.category}
          </span>
          <p className="text-lg font-semibold text-right">{item.price}€</p>
        </div>
      </div>
    </div>
  );
}
