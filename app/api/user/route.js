import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function GET() {
  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  const users = await db.all("SELECT * FROM user");
  return new Response(JSON.stringify(users), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
