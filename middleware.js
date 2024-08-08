import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ["/"];
const authRoutes = ["/login", "/register"];

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Proteger rutas
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
