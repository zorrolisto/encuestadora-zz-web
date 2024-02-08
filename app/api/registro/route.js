import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db = null;

export async function GET(req) {
  const params = req.nextUrl.searchParams;
  const page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;
  const registrosOffset = Number(params.get("offset")) || 0;
  const offset = (page - 1) * limit + registrosOffset;
  const censadorId = Number(params.get("censadorId"));

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
            "SELECT COUNT(*) AS total FROM registro WHERE censadorId = ?",
            censadorId
          )
        : undefined;
    const registros = await db.all(
      "SELECT id, address, nroPersonas, income, nroMenores, aguaPotable, luz, fechaTomada FROM registro" +
        (censadorId ? " WHERE censadorId = " + censadorId : "") +
        " LIMIT ? OFFSET ?",
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

export async function POST(req) {
  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const registrosToUpload = await req.json();
    const email = userCredentials.email;
    const user = await db.get("SELECT * FROM user WHERE email = ?", email);
    const isValidPassword = user
      ? await bcrypt.compare(userCredentials.password, user.password)
      : false;
    if (!isValidPassword)
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 400 }
      );
    const tokenUser = { ...user, password: undefined };
    const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
    return NextResponse.json({ user: tokenUser, token }, { status: 200 });
  } catch (_) {
    return NextResponse.json({ error: "Error happend" }, { status: 400 });
  }
}
