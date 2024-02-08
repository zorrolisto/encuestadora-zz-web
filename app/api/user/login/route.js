import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let db = null;

export async function POST(req, res) {
  if (!db) {
    db = await open({
      filename: "./encuestadora.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const userCredentials = await req.json();
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
