import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function GET(req) {
  const params = req.nextUrl.searchParams;
  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;
  const offset = (page - 1) * limit;

  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    let count =
      page === 1
        ? await db.get(
            "SELECT COUNT(*) AS total FROM user WHERE rol = ?",
            "Censador"
          )
        : undefined;
    const censadores = await db.all(
      "SELECT id, name, email, sex FROM user WHERE rol = ? LIMIT ? OFFSET ?",
      "Censador",
      limit,
      offset
    );
    return NextResponse.json({ censadores, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}
