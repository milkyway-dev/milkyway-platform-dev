import { NextRequest, NextResponse } from "next/server";
import { config as _config } from "./lib/config";
function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
    const expirationTime = decodedPayload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    return true; // If token can't be parsed, consider it expired
  }
}

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies.get("token");
  
  // Check token expiration
  if (token?.value && isTokenExpired(token.value)) {
    console.log("Token expired");
    const response = NextResponse.redirect(new URL("/logout", request.url));
    response.cookies.delete("token");
    return response;
  }

  if ((isPublicPath || path === "/login" || path === "/game") && token) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
