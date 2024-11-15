import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Retrieve the session token using `getToken`
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

// Specify the paths where the middleware will apply
// export const config = {
//   matcher: ['/profile/:path*', '/invitations/:path*'],  // Apply middleware to these routes
// };
