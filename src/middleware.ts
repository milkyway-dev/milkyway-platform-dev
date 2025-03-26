import { NextRequest, NextResponse } from "next/server";
import { config as _config } from "./lib/config";

function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
    const expirationTime = decodedPayload.exp * 1000;
    return Date.now() >= expirationTime;
  } catch (error) {
    return true;
  }
}



export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies.get("token");
  const AWSALB = request.cookies.get("AWSALB");
  const AWSALBCORS = request.cookies.get("AWSALBCORS");




  if (_config.nodeEnv !== 'development' && token?.value && isTokenExpired(token.value)) {
    const response = NextResponse.redirect(new URL("/logout", request.url));
    response.cookies.delete("token");
    response.cookies.delete("AWSALB");
    response.cookies.delete("AWSALBCORS");
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
