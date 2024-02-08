import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function GET(req) {
  const params = req.nextUrl.searchParams;
  const censadorId = Number(params.get("censadorId"));
  const campanaId = Number(params.get("campanaId"));

  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const avanceCampana = await db.get(
      `SELECT 
        avancescampaña.id, campaña.id AS campañaId, campaña.casasPorCensador, campaña.fechaLimite, avancescampaña.registrosSubidos, avancescampaña.ultimaFechaDeSubida 
      FROM 
        avancescampaña INNER JOIN campaña ON avancescampaña.campañaId = campaña.id 
      WHERE 
        avancescampaña.censadorId = ?`,
      censadorId
    );
    return NextResponse.json({ avanceCampana }, { status: 200 });
  } catch (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}

export async function PUT(req) {
  const params = req.nextUrl.searchParams;
  const campanaId = Number(params.get("campanaId"));

  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const campañaUpdated = await req.json();
    await db.run(
      `UPDATE avancescampaña SET registrosSubidos = ?, ultimaFechaDeSubida= ? WHERE id = ?`,
      campañaUpdated.registrosSubidos,
      campañaUpdated.ultimaFechaDeSubida,
      campanaId
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log("error");
    console.log(error);
    return NextResponse.json({ error: "Ocurrió un error" }, { status: 400 });
  }
}
