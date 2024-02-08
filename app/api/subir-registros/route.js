import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function POST(req) {
  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const registrosToUpload = await req.json();
    const values = registrosToUpload
      .map(
        (r) =>
          `('${r.address}', ${r.aguaPotable}, ${r.luz}, '${r.fechaTomada}', ${r.nroMenores}, ${r.nroPersonas}, ${r.income}, ${r.censadorId})`
      )
      .join(", ");
    await db.run(
      `INSERT INTO registro (address, aguaPotable, luz, fechaTomada, nroMenores, nroPersonas, income, censadorId) VALUES ${values}`
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}
