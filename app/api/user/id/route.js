import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function GET(req, res) {
  const id = req.query.id;

  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }

  try {
    const user = await db.get("SELECT * FROM user WHERE id = ?", id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}

export async function PUT(req) {
  if (!db)
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });

  try {
    const userUpdated = await req.json();
    await db.run(
      "UPDATE user SET name = ?, email = ? WHERE id = ?",
      userUpdated.name,
      userUpdated.email,
      userUpdated.id
    );
    return NextResponse.json({ userUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}
