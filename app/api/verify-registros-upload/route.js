import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function GET(req) {
  const params = req.nextUrl.searchParams;
  const censadorId = Number(params.get("censador"));
  const lote = Number(params.get("lote")) || 1;

  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    let count =
      page === 1
        ? await db.get("SELECT COUNT(*) AS total FROM registro")
        : undefined;
    const registros = await db.all(
      "SELECT id, address, nroPersonas, income, nroMenores, aguaPotable, luz, fechaTomada FROM registro " +
        (censadorId ? "WHERE censadorId = " + censadorId : "") +
        "LIMIT ? OFFSET ?",
      limit,
      offset
    );
    return NextResponse.json({ registros, count }, { status: 200 });
  } catch (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}
