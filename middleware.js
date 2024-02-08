import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.headers.get("authorization");
  if (!token) {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 400 });
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
    NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token no es válido" }, { status: 400 });
  }
}

export const config = {
  matcher: [
    "/api/user/id",
    "/api/user",
    "/api/subir-registros",
    "/api/user/censadores",
    "/api/registro",
    "/api/avance-campana",
    "/api/verify-registros-upload",
  ],
};
