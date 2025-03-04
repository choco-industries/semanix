import {BunSQLiteDatabase} from "drizzle-orm/bun-sqlite";

export interface ContextForHono {
  Variables: { db: BunSQLiteDatabase };
}
