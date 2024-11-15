import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {

  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path=request.nextUrl.pathname;
  const isPublicPath=path==='/signin' || path==='/signup' || path==='/verifymail';

  if(isPublicPath && session){
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/invitations') && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}