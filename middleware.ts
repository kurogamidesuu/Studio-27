import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath = path === '/login' || path.startsWith('/static') || path.includes('.')
  const isAuthenticated = req.cookies.get('studio27_access')?.value === 'true';

  if(path === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if(!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}