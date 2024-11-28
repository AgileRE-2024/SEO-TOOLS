"use server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = new URL(req.url);

  // 1. Lindungi halaman yang memerlukan autentikasi
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Mencegah akses ke /login dan /signup jika user sudah login
  if (token && (url.pathname === "/login" || url.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Izinkan permintaan lainnya
  return NextResponse.next();
}

// Tentukan rute yang akan dikenakan middleware
export const config = {
  matcher: ["/dashboard/history", "/login", "/signup"],
};
