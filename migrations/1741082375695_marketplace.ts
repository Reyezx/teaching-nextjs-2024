import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE marketplace (
    id integer primary key autoincrement not null,
    name text not null,
    description text not null,
    price real not null,
    category text not null,
    created_at integer not null)
    STRICT`.execute(db);
}