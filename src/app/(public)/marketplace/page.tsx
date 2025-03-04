import { createDB } from "../../../lib/db";
import Link from "next/link";

export default async function Marketplace() {
  const db = createDB();

  const marketplace = await db.selectFrom("marketplace").selectAll().execute();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
      <div className="grid grid-cols-2 gap-4">
        {marketplace.map((item) => (
          <div
            key={item.id}
            className="card drop-shadow-lg compact bg-stone-100 duration-300 hover:-translate-y-4 hover:drop-shadow-2xl">
            <Link href={`/marketplace/${item.id}`}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}